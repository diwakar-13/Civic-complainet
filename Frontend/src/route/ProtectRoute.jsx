import { useAuth } from "../context/authContext";
import { Navigate, replace } from "react-router-dom";
const ProtectRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until auth check finishes
  if (loading) {
    return null;
  }
  //   if no user , redirect to landing page
  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  //   if exist, allow to dashboard
  return children;
};

export default ProtectRoute;
