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
    </div>
  );
};

export default Welcome;
