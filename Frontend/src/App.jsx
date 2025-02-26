import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup.jsx";
import Login from "./components/login/login.jsx";
import UserDashboard from "./components/user-dashboard/userDashboard.jsx";
import AdminDashboard from "./components/admin-dashboard/adminDashboard.jsx";
import PrivateRoute from "./utils/routeProtection/privateRoute.jsx";
import Review from "./components/Review/Review.jsx";
import Welcome from "./components/welcome/welcome.jsx";
import { useDispatch } from "react-redux";
import { getReviews } from "./store/reviews/reviewActions.js";
import AuthRedirect from "./utils/routeProtection/AuthRedirect.jsx";
import ReviewTable from "./components/ReviewTable/ReviewTable.jsx";
import PrivateUserRoute from "./utils/routeProtection/UserRoutes.jsx";

const App = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    if (token !== null && token !== "undefined") {
      dispatch(getReviews());
    }
  }, [token, dispatch]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Welcome />
            </AuthRedirect>
          }
        />
        <Route
          path="/review"
          element={
            <PrivateUserRoute>
              <Review />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/review-table"
          element={
            <PrivateUserRoute>
              <ReviewTable />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <PrivateUserRoute>
              <UserDashboard />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
