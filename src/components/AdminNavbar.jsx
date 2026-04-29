import logo from "../assets/paw.svg"
import NavButton from "./NavButton"
import "../styles/AdminNavbar.css"
import LogoutButton from "./LogoutButton"
import UserDisplay from "./UserDisplay"

function AdminNavbar({ onLogout, userInfo}) {
    return(
        <div className="admin-navbar">
            <div className="admin-navbar__options">
                <img className="admin-navbar__logo" src={logo} alt="Logo" />
                <NavButton linkTo="/" text="Inicio"/>
                <NavButton linkTo="/products" text="Productos" />
                <NavButton linkTo="/" text="Contacto" />
                <NavButton linkTo="/admin" text="Administración" />
            </div>
            <div className="admin-navbar__options">
                <UserDisplay userName={userInfo()} />
                <LogoutButton onClick={onLogout} />
            </div>
        </div>
    )
}

export default AdminNavbar