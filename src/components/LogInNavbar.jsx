import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/LoginNavbar.css"

function LogInNavbar() {
    return(
        <div className="login-navbar">
            <img className="login-navbar__logo" src={logo} alt="Logo" />
            <div className="login-navbar__options">
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/" text="Contacto" />
            </div>
            <NavButton isButton={true} linkTo="/register" text="Registrarse" />
        </div>
    )
}

export default LogInNavbar