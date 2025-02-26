import { userActions } from "./userSlice.js";
import API from "../../utils/axiosInstance/axiosInstance.js";

export const fetchUsers = () => async (dispatch) => {
  const role = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("jwtToken");

  // Add null checks and proper role validation
  if (role && token && role === "admin") {
    try {
      dispatch(userActions.setLoading(true));
      const { data } = await API.get("/user/fetchusers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(userActions.setUsers(data));
    } catch (err) {
      dispatch(userActions.setError(err.message));
      console.log(err + "error fetching users");
    } finally {
      dispatch(userActions.setLoading(false));
    }
  }
};
