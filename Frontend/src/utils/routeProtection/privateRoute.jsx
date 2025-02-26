import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("jwtToken");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return user === "admin" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
