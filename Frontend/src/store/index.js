import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import reviewSlice from "./reviews/review-slice";
import userSlice from "./users/userSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    review: reviewSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
