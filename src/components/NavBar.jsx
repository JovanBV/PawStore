import { useLocation, useNavigate } from "react-router-dom"
import LogInNavbar from "../components/LogInNavbar"
import AdminNavbar from "../components/AdminNavbar"
import RegisterNavbar from "./RegisterNavbar";
import HomeNavbar from "./HomeNavbar";
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const navigate = useNavigate();
    const { logout, isAuthenticated, isAdmin, getUser } = useAuth()
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    if (location.pathname === "/login") {
        return <LogInNavbar onLogin={handleLogin} />;
    }

    if (location.pathname === "/register") {
        return <RegisterNavbar />;
    }

    if (location.pathname === "/admin") {
        return isAdmin ? (
            <AdminNavbar userInfo={getUser} onLogout={handleLogout} />
        ) : null;
    }

    if (isAuthenticated) {
        return <HomeNavbar userInfo={getUser} onLogout={handleLogout} isAdmin={isAdmin} />;
    } else {
        return <HomeNavbar onLogin={handleLogin} />;
    }
}

export default Navbar;