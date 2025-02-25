import API from "../../utils/axiosInstance/axiosInstance";
import { reviewActions } from "./review-slice";

const token = sessionStorage.getItem("jwtToken");
export const getReviews = () => async (dispatch) => {
  try {
    dispatch(reviewActions.setLoading(true));
    const { data } = await API.get("/reviews/getreviews", {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const tagReview = (reviewId, tags) => async (dispatch) => {
  try {
    dispatch(reviewActions.setLoading(true));
    const { data } = await API.put(`/reviews/tag-review/${reviewId}`, tags, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(reviewActions.setReviews(data.reviews));
    dispatch(reviewActions.setLoading(false));
  } catch (err) {
    dispatch(reviewActions.setError(err.message));
    console.log(err + "error tagging review");
  }
};
