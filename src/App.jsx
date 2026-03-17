import Navbar from "./components/NavBar"
import Home from "./components/Home"
import { Route, Routes } from "react-router-dom"
import "./styles/App.css"
import Footer from "./components/Footer"
import Catalog from "./components/Catalog"
import ProductDetail from "./components/ProductDetail"
import ProductList from "./data/products.json"

function App() {

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog products={ProductList}/>} />
          <Route path="/products/:productId" element={<ProductDetail/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App