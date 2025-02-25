import { userActions } from "./userSlice.js";
import API from "../../utils/axiosInstance/axiosInstance.js";
const token = sessionStorage.getItem("jwtToken");
const role = sessionStorage.getItem("user");
export const fetchUsers = () => async (dispatch) => {
  if (role.replace(/"/g, "") !== "admin") {
    return;
  }
  try {
    dispatch(userActions.setLoading(true));
    const { data } = await API.get("/user/fetchusers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(userActions.setUsers(data));
    dispatch(userActions.setLoading(false));
  } catch (err) {
    dispatch(userActions.setError(err.message));
    console.log(err + "error fetching users");
  }
};
