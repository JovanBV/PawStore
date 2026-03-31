import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

const RootLayout = () => (
  <div className="app">
    <Navbar />
        <main className="main">
            <Outlet />
        </main>
    <Footer />
  </div>
)

export default RootLayout