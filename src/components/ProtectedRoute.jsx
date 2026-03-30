import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
    const isAdmin = useAuthStore((state) => state.isAdmin());

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/restricted" replace />;
    }

    return children;
}