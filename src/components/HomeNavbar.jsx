import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/HomeNavbar.css"
import LogoutButton from "./LogoutButton"
import UserDisplay from "./UserDisplay"

function HomeNavbar({ userInfo, onLogout, onLogin, isAdmin }) {
    return(
        <div className="navbar">
            <img className="navbar-logo" src={logo} alt="Logo" />
            <div className="navbar-options">
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/contact" text="Contacto" />
                
                {isAdmin && (
                    <NavButton linkTo="/admin" text="Admin" />
                )}

                {userInfo &&(
                    <UserDisplay userName={userInfo()}/>
                )}

                {onLogout ? (
                    <LogoutButton onClick={onLogout}/>
                ) : null}

                {onLogin ? (
                    <NavButton linkTo="/login" text="Iniciar sesion" isButton={true} onClick={onLogin} className="nav-inactive">Iniciar sesión</NavButton>
                ): null}
            </div>
        </div>
    )
}

export default HomeNavbar