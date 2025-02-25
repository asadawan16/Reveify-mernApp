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

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
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
