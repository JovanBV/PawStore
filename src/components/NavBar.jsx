import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore";
import LogInNavbar from "../components/LogInNavbar"
import AdminNavbar from "../components/AdminNavbar"
import RegisterNavbar from "./RegisterNavbar";
import HomeNavbar from "./HomeNavbar";

function Navbar() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
    const isAdmin = useAuthStore((state) => state.isAdmin());
    const location = useLocation();
    const getUser = useAuthStore((state) => state.getUser);

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