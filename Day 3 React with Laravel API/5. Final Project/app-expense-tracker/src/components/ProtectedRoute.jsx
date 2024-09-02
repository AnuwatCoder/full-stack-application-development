import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/api";

function ProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the child components
  return children;
}

export default ProtectedRoute;
