import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthRedirect({ children }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  const userRole = sessionStorage.getItem("user");

  useEffect(() => {
    if (token) {
      if (userRole === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else if (userRole === "user") {
        navigate("/review", { replace: true });
      }
    }
  }, [token, userRole, navigate]);

  return token ? null : children;
}

export default AuthRedirect;
