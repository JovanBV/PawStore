import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/AdminNavbar.css"
import LogoutButton from "./LogoutButton"
import UserDisplay from "./UserDisplay"

function AdminNavbar({ onLogout, userInfo}) {
    return(
        <div className="navbar">
            <div className="navbar-options">
                <img className="navbar-logo" src={logo} alt="Logo" />
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/" text="Contacto" />
                <NavButton linkTo="/admin" text="Administración" />
            </div>
            <div className="navbar-options">
                <UserDisplay userName={userInfo()} />
                <LogoutButton onClick={onLogout} />
            </div>
        </div>
    )
}

export default AdminNavbar