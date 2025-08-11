import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // If the user is logged in, redirect them from the public page
    // Redirect to a default dashboard based on their role
    const redirectPath =
      user.role === "Admin" ? "/admin/dashboard" : "/police/dashboard";
    return <Navigate to={redirectPath} />;
  }

  // If no user is logged in, render the page (e.g., Login)
  return children;
};

export default PublicRoute;
