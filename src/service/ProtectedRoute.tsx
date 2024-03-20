import { Navigate } from "react-router-dom";
import { getToken } from "./auth";

export const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};