import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import AdminPage from "./pages/AdminPage"
import EditPage from "./pages/EditPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import RestrictedPage from "./pages/RestrictedPage"
import ProtectedRoute from "./components/ProtectedRoute"
import RootLayout from "./components/RootLayout"
import "./styles/App.css"

const App = () => {
  return (
    <Router>
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
        </Route>
      </Routes>
    </Router>
  )
}

export default App