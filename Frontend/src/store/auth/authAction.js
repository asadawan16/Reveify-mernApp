import API from "../../utils/axiosInstance/axiosInstance";
import { authActions } from "./authSlice";
export const authenticate = (data) => async (dispatch) => {
  try {
    const { data: response } = await API.post("/auth/login", data);
    sessionStorage.setItem("jwtToken", response.token);
    sessionStorage.setItem("user", JSON.stringify(response.user.role));
    dispatch(
      authActions.login({ token: response.token, user: response.user.role })
    );
    return { success: true, user: response.user };
  } catch (err) {
    console.error("Login error:", err.response?.data?.error || err.message);
    return {
      success: false,
      error: err.response?.data?.error || "Login failed",
    };
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("jwtToken");
  sessionStorage.removeItem("user");
  dispatch(authActions.logout());
};
