import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/LoginNavbar.css"

function LogInNavbar() {
    return(
        <div className="navbar">
            <img className="navbar-logo" src={logo} alt="Logo" />
            <div className="navbar-options">
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/" text="Contacto" />
                <NavButton isButton={true} linkTo="/register" text="Registrarse" />
            </div>
        </div>
    )
}

export default LogInNavbar