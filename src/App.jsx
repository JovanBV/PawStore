import Navbar from "./components/NavBar"
import Home from "./components/Home"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from "react-router-dom"
import "./styles/App.css"
import Footer from "./components/Footer"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import AdminPage from "./pages/AdminPage"
import EditPage from "./pages/EditPage"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./components/ProtectedRoute"
import RegisterPage from "./pages/RegisterPage"
import RestrictedPage from "./pages/RestrictedPage"
import Loading from "./components/Loading"


const RootLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const routes = createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route path="/" element={<Home />} />
    <Route 
      path="/products" 
      element={
        <ProtectedRoute>
          <ProductsPage />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/products/:productId" 
      element={
      <ProtectedRoute>
        <ProductDetailPage/>
      </ProtectedRoute>
      } 
    />
    <Route path="/restricted" element={<RestrictedPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route 
      path="/admin" 
      element={
        <ProtectedRoute requireAdmin={true}>
          <AdminPage />
        </ProtectedRoute>
      } 
    />
    
    <Route 
      path="/edit/:productId" 
      element={
        <ProtectedRoute requireAdmin={true}>
          <EditPage />
        </ProtectedRoute>
      } 
    />
  </Route>
)

const router = createBrowserRouter(routes)

const App = () => <RouterProvider router={router} />

export default App