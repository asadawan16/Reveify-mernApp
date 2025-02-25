import API from "../../utils/axiosInstance/axiosInstance";
import { reviewActions } from "./review-slice";

const token = sessionStorage.getItem("jwtToken");
const role = sessionStorage.getItem("user");
export const getReviews = () => async (dispatch) => {
  try {
    dispatch(reviewActions.setLoading(true));
    const { data } = await API.get("/reviews/getreviews", {
      headers: {
        Authorization: `Bearer ${token}`,
        Role: role,
      },
    });
    dispatch(reviewActions.setReviews(data));
    dispatch(reviewActions.setLoading(false));
  } catch (err) {
    dispatch(reviewActions.setError(err.message));
    console.log(err + "error fetching reviews");
  }
};

export const addReview = (review) => async (dispatch) => {
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
  try {
    dispatch(reviewActions.setLoading(true));
    const { data } = await API.put(`/reviews/updatetag/${reviewId}`, tags, {
      headers: {
        Authorization: `Bearer ${token}`,
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
