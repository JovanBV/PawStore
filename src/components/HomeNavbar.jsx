import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/HomeNavbar.css"
import LogoutButton from "./LogoutButton"
import UserDisplay from "./UserDisplay"

function HomeNavbar({ userInfo, onLogout, onLogin, isAdmin }) {
    return(
        <div className="home-navbar">
            <img className="home-navbar__logo" src={logo} alt="Logo" />
            <div className="home-navbar__options">
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/about" text="Acerca de" />
                <NavButton linkTo="/cart" text="Carrito" />
            </div>
            <div>
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
                    <NavButton linkTo="/login" text="Iniciar sesion" isButton={true} onClick={onLogin}>Iniciar sesión</NavButton>
                ): null}
            </div>
        </div>
    )
}

export default HomeNavbar