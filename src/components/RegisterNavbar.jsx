import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/RegisterNavbar.css"

function RegisterNavbar() {
    return(
        <div className="navbar">
            <img className="navbar-logo" src={logo} alt="Logo" />
            <div className="navbar-options">
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/" text="Contacto" />
            </div>
            <NavButton linkTo="/login" text="Iniciar sesion" isButton={true}/>
        </div>
    )
}

export default RegisterNavbar