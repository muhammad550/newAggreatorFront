import { Navigate } from "react-router-dom";

// Simulate checking if the user is authenticated
const isAuthenticated = () => {
  // Replace this with your actual authentication check logic
  return localStorage.getItem("userToken"); // Example: checking token in localStorage
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
