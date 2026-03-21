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
                    <NavLink to={`/`} className={toggle}>Home</NavLink>
                    <NavLink to={`/products`} className={toggle}>Catalog</NavLink>
                    <NavLink to={`/contact`} className={toggle}>Contact</NavLink>
                </div>
            </div>
            }

export default Navbar