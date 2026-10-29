import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const userId =
    sessionStorage.getItem("user_id");

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;