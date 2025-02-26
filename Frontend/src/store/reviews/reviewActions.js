import API from "../../utils/axiosInstance/axiosInstance";
import { reviewActions } from "./review-slice";
export const getReviews = () => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  const role = sessionStorage.getItem("user");

  if (!token || !role) {
    dispatch(reviewActions.setError("Authentication required"));
    return;
  }
  try {
    dispatch(reviewActions.setLoading(true));
    const { data } = await API.get("/reviews/getreviews", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(reviewActions.setReviews(data));
  } catch (err) {
    dispatch(reviewActions.setError(err.message));
    console.log("Error fetching reviews:", err);
  } finally {
    dispatch(reviewActions.setLoading(false));
  }
};
export const addReview = (review) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");

  try {
    dispatch(reviewActions.setLoading(true));
    const { data } = await API.post("/reviews/submit-reviews", review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(reviewActions.setReviews(data.reviews));
    dispatch(reviewActions.setLoading(false));
  } catch (err) {
    dispatch(reviewActions.setError(err.message));
    console.log(err + "error adding review");
  }
};

export const UpdateReviewTag = (reviewId, tags) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  const role = sessionStorage.getItem("user");
  try {
    dispatch(reviewActions.setLoading(true));
    const { data } = await API.put(`/reviews/updatetag/${reviewId}`, tags, {
      headers: {
        Authorization: `Bearer ${token}`,
        Role: role,
      },
    });
    dispatch(getReviews());
    dispatch(reviewActions.setLoading(false));
    console.log("updated");
  } catch (err) {
    dispatch(reviewActions.setError(err.message));
    console.log(err + "error tagging review");
  }
};
