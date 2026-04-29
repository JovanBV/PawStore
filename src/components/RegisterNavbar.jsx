import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/RegisterNavbar.css"

function RegisterNavbar() {
    return(
        <div className="register-navbar">
            <img className="register-navbar__logo" src={logo} alt="Logo" />
            <div className="register-navbar__options">
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/" text="Contacto" />
            </div>
            <NavButton linkTo="/login" text="Iniciar sesion" isButton={true}/>
        </div>
    )
}

export default RegisterNavbar