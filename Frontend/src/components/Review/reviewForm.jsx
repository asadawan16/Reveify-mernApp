import React from "react";
import classes from "./review-form.module.css";
const ReviewForm = () => {
  return (
    <div className={classes.reviewForm}>
      <h2>We Value Your Opinion Share Your Thoughts</h2>
      <form action="">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Review"
        ></textarea>
        <button className={classes.submitbtn}>Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
