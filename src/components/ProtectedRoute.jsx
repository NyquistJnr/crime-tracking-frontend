import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// This component protects routes that require any logged-in user
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

// This component specifically protects routes for Admins
export const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "Admin") {
    // If the user is not an Admin, redirect to a generic "unauthorized" page or home
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
