import Home from "../components/Home"
import ProductDetailPage from "../pages/ProductDetailPage"
import AdminPage from "../pages/AdminPage"
import EditPage from "../pages/EditPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import RestrictedPage from "../pages/RestrictedPage"
import ProtectedRoute from "../components/ProtectedRoute"
import RootLayout from "../components/RootLayout"
import { Route, Routes } from "react-router-dom"
import ProductsPage from "../pages/ProductsPage"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import CheckoutSuccessPage from "../pages/CheckoutSuccessPage"
import NotFoundPage from "../pages/NotFoundPage"

const AppRoutes = () => {
  const navigate = useNavigate();
  const { setOnAuthError } = useAuth();

  useEffect(() => {
    setOnAuthError(() => () => navigate('/login'));
  }, []);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restricted" element={<RestrictedPage />} />
        
        <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/products/:productId" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
        
        <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPage /></ProtectedRoute>} />
        <Route path="/edit/:productId" element={<ProtectedRoute requireAdmin><EditPage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/receipt/:cartId" element={<ProtectedRoute><CheckoutSuccessPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;