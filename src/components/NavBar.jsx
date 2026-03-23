import "../styles/NavBar.css"
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/paw.svg"

function Navbar() {
    const toggle = (navData) => {
    return navData.isActive ? "nav-active" : "nav-inactive";
    }

    return <div className="navbar">
                <img className="navbar-logo" src={logo}/>
                <div className="navbar-options">
                    <Link to={`/`} className="option">Home</Link>
                    <Link to={`/products`} className="option">Catalog</Link>
                    <Link to={`/`} className="option">Contact</Link>
                </div>
            </div>
            }

export default Navbar