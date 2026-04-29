import { BrowserRouter as Router } from "react-router-dom"
import "./styles/App.css"
import AppRoutes from "./components/AppRoutes"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App