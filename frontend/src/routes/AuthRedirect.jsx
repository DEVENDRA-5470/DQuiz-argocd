import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthRedirect({ children }) {
  const { user, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    const path = user.role === "admin" ? "/admin-dashboard" : "/student-dashboard";
    return <Navigate to={path} replace />;
  }

  return children;
}
