import Navbar from "./components/NavBar"
import Home from "./components/Home"
import { Route, Routes } from "react-router-dom"
import "./styles/App.css"
import Footer from "./components/Footer"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import AdminPage from "./pages/AdminPage"
import EditPage from "./pages/EditPage"

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/edit/:productId" element={<EditPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}


export default App