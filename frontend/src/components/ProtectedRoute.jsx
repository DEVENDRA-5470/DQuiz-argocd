import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowed }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  // ------------------ NOT LOGGED IN ------------------
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ------------------ ROLE NOT ALLOWED ------------------
  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  // ------------------ ALLOWED ------------------
  return children;
}
