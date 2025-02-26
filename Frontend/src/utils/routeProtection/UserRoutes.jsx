import React from "react";
import { Navigate } from "react-router-dom";

const PrivateUserRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("jwtToken");
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return user === "user" ? children : <Navigate to="/login" />;
};

export default PrivateUserRoute;
