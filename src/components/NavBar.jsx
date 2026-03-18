import "../styles/NavBar.css"
import { Link } from "react-router-dom"
import logo from "../assets/paw.svg"

function Navbar() {
    return <div className="navbar">
                <img className="navbar-logo" src={logo}/>
                <div className="navbar-options">
                    <Link to={`/`} className="option">Home</Link>
                    <Link to={`/products`} className="option">Catalog</Link>
                    <Link to={`/`} className="option">Contact</Link>
                    <Link to={`/admin`} className="option">Admin</Link>
                </div>
            </div>
            }

export default Navbar