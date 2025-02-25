import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthRedirect({ children }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  const userRole = sessionStorage.getItem("user");

  useEffect(() => {
    if (token && token !== "undefined") {
      if (userRole === '"admin"') {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/review", { replace: true });
      }
    }
  }, [token, userRole, navigate]);

  if (token && token !== "undefined") {
    return null;
  }

  return children;
}

export default AuthRedirect;
