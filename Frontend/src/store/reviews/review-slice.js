import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    filteredReviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilteredReviews(state, action) {
      state.filteredReviews = action.payload;
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice;
