import React, { useState } from "react";
import classes from "./review-form.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviews/reviewActions";
const ReviewForm = () => {
  const ratingOptions = [1, 2, 3, 4, 5];
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [agentName, setAgentName] = useState("");
  const [location, setLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [discountApplied, setDiscount] = useState(null);
  const [orderPrice, setOrderPrice] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [agentId, setAgentId] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      agentId,
      agentName,
      rating,
      location,
      reviewText,
      discountApplied,
      orderPrice,
      customerId
    );
    if (
      !agentName ||
      !location ||
      !reviewText ||
      discountApplied === null ||
      !orderPrice ||
      !customerId ||
      rating === null
    ) {
      alert("Please fill in all the fields");
      return;
    }
    const reviewData = {
      agentId,
      agentName,
      location,
      reviewText,
      discountApplied,
      orderPrice,
      customerId,
      rating,
    };
    try {
      // Dispatch the action with review data
      await dispatch(addReview(reviewData));
      alert("Review added successfully");
    } catch {
      alert("Failed to add review");
    }

    // Clear form fields
    setAgentId("");
    setAgentName("");
    setLocation("");
    setReviewText("");
    setDiscount("");
    setOrderPrice("");
    setCustomerId("");
    setRating("");
  };

  return (
    <div className={classes.reviewForm}>
      <h2>We Value Your Opinion Share Your Thoughts</h2>
      <form onSubmit={handleSubmit}>
        <h3>Write a Review</h3>
        <label htmlFor="AgentId">AgentId</label>
        <input
          type="text"
          placeholder="AgentId"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          required
        />

        <label htmlFor="AgentName">Agent Name</label>
        <input
          type="text"
          placeholder="Agent Name"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          required
        />
        <label htmlFor="Location">Location</label>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <label htmlFor="OrderPrice"> Order Price</label>
        <input
          type="number"
          placeholder="Order Price"
          value={orderPrice}
          onChange={(e) => setOrderPrice(e.target.value)}
          required
        />
        <label htmlFor="Discount"> Discount</label>
        <input
          type="number"
          placeholder="Discount Applied"
          value={discountApplied}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
        <label htmlFor="CustomerId">Customer Id</label>
        <input
          type="number"
          placeholder="Customer Id"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
        <label htmlFor="Review"> Review</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Review"
        ></textarea>
        <div className={classes.rating}>
          <label htmlFor="rating">Customer Rating :</label>
          {ratingOptions.map((value) => (
            <span
              key={value}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
            >
              {value <= (hoverRating || rating) ? (
                <FaStar className={classes.starselected} />
              ) : (
                <FaRegStar />
              )}
            </span>
          ))}
        </div>
        <button className={classes.submitbtn}>Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
