import { userActions } from "./userSlice.js";
import API from "../../utils/axiosInstance/axiosInstance.js";

export const fetchUsers = () => async (dispatch) => {
  const role = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("jwtToken");

  if (role && token && role === "admin") {
    try {
      dispatch(userActions.setLoading(true));
      const { data } = await API.get("/user/fetchusers", {
        headers: {
          Authorization: `Bearer ${token}`,
          Role: role,
        },
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

export const blockUnblockUser = (userId) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  const role = sessionStorage.getItem("user");
  if (!token) {
    dispatch(userActions.setError("Authentication required"));
    return;
  }

  try {
    dispatch(userActions.setLoading(true));

    const { data } = await API.patch(
      `/user/updatestatus/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Role: role,
        },
      }
    );

    dispatch(userActions.updateUserStatus(data.data));
    alert(data.message);
  } catch (err) {
    dispatch(
      userActions.setError(
        err.response?.data?.error || "Failed to update user status"
      )
    );
    console.error("Error blocking/unblocking user:", err);
  } finally {
    dispatch(userActions.setLoading(false));
  }
};
