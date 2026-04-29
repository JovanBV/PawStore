import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
const { isAuthenticated, isAdmin } = useAuth();

if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
}

if (!isAuthenticated) {
    return <Navigate to="/restricted" replace />;
}

return children;
}