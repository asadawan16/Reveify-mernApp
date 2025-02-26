import React from "react";
import { Navigate } from "react-router-dom";

const PrivateUserRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");

  console.log("User Data:", user);

  return user.replace(/"/g, "") === "user" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateUserRoute;
