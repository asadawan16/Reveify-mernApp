import React, { useState } from "react";
import classes from "./updateTags.module.css";
import { useDispatch } from "react-redux";
import { UpdateReviewTag } from "../../store/reviews/reviewActions";

const UpdateTags = ({ id, tags, setToggle }) => {
  const dispatch = useDispatch();
  const [newtags, setTag] = useState({
    sentiment: tags.sentiment || "",
    accuracy: tags.accuracy || "",
    performance: tags.performance || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("updating");
      await dispatch(UpdateReviewTag(id, newtags));
      alert("Tags updated successfully");
      setToggle(false);
    } catch {
      alert("Error updating tags");
    }
  };

  return (
    <form className={classes["update-tags"]}>
      <h2>Update Tags for Review Id: {id}</h2>
      <label htmlFor="tags">Current tags</label>
      <div className={classes["current-tags"]}>
        <span>Sentiment: {tags.sentiment}</span>
        <span>Accuracy: {tags.accuracy}</span>
        <span>Performance: {tags.performance}</span>
      </div>

      <label htmlFor="Sentiment">Sentiment</label>
      <select
        name="Sentiment"
        value={newtags.sentiment}
        onChange={(e) => setTag({ ...newtags, sentiment: e.target.value })}
      >
        <option value=""></option>
        <option value="Positive">Positive</option>
        <option value="Neutral">Neutral</option>
        <option value="Negative">Negative</option>
      </select>

      <label htmlFor="Accuracy">Accuracy</label>
      <select
        name="Accuracy"
        value={newtags.accuracy}
        onChange={(e) => setTag({ ...newtags, accuracy: e.target.value })}
      >
        <option value=""></option>
        <option value="Order Accurate">Order Accurate</option>
        <option value="Order Mistake">Order Mistake</option>
      </select>

      <label htmlFor="Performance">Performance</label>
      <select
        name="Performance"
        value={newtags.performance}
        onChange={(e) => setTag({ ...newtags, performance: e.target.value })}
      >
        <option value=""></option>
        <option value="Fast">Fast</option>
        <option value="Average">Average</option>
        <option value="Slow">Slow</option>
      </select>

      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => setToggle(false)}>Cancel</button>
    </form>
  );
};

export default UpdateTags;
