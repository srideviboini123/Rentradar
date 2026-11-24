
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
    const { user, isAuthenticated } = useAuth();

    // Check whether the user is logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check whether the user's role is permitted
    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role?.toLowerCase())
    ) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;

