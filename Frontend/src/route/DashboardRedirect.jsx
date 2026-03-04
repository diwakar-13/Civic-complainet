import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const DashboardRedirect = () => {
  const { user } = useAuth();
 
  if (!user) return null;

  if (user.role === "USER" ) {
    return <Navigate to="/dashboard/submit-complaint" replace />;
  }

  if (user.role === "ADMIN" || (user.role === "SUPER_ADMIN" )) {
    return <Navigate to="/dashboard/admin-overview" replace />;
  }

  return null;
};

export default DashboardRedirect;
