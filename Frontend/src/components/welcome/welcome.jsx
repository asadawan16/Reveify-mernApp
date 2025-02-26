import React from "react";
import { Link } from "react-router-dom";
import classes from "./welcome.module.css";
const Welcome = () => {
  return (
    <div className={classes.welcome}>
      <h1>Reviefy</h1>
      <p>Your Feedback Matters—Submit Your Review Today!</p>
      <Link to="/login" className={classes.welcomebtn}>
        Login
      </Link>
      <Link to="/signup" className={classes.welcomebtn}>
        Sign up
      </Link>
      <p className={classes.note}>
        Note: The deployed frontend is facing CORS issue if you want to view
        User based Ui you can access it through this user specific route
        <Link to={"/review"}>review page</Link>
        the route protection is removed . To test on Localhost uncomment the
        localhost url in axiosInstance at Frontend/src/utils/axiosInstance
      </p>
    </div>
  );
};

export default Welcome;
