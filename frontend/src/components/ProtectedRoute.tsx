import React, { useEffect } from "react"; // 1️⃣ Import useEffect
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner"; // 2️⃣ Import toast
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth();
  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("Please log in to access this page");
      } else if (requiredRole && profile?.role !== requiredRole) {
        toast.error("Unauthorized: Admin access only");
      }
    }
  }, [loading, user, profile, requiredRole]);
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;