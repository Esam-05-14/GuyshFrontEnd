import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../data/AuthContext";

export default function ProtectedRoutes({allowedRoles}) {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  const userHasAccess = allowedRoles.some(role => user.roles?.[role]);
  if (!userHasAccess) return <Navigate to="/" replace />;


  return <Outlet />;
}
