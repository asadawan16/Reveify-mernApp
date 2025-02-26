import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewActions } from "../../store/reviews/review-slice";
import classes from "./dataFiltering.module.css";
const ReviewDataFiltering = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review.reviews);

  const [filter, setFilter] = useState({
    location: "",
    orderPrice: "",
    rating: "",
  });

  const [filteredData, setFilteredData] = useState([]);

  // Update filtered data when filter changes
  useEffect(() => {
    const updatedData = data
      .filter((review) =>
        filter.location ? review.location === filter.location : true
      )
      .filter((review) =>
        filter.rating ? review.rating === Number(filter.rating) : true
      )
      .sort((a, b) => {
        if (filter.orderPrice === "low-to-high")
          return a.orderPrice - b.orderPrice;
        if (filter.orderPrice === "high-to-low")
          return b.orderPrice - a.orderPrice;
        return 0;
      });

    setFilteredData(updatedData);
  }, [filter]);

  // Dispatch filtered data to Redux
  useEffect(() => {
    dispatch(reviewActions.setFilteredReviews(filteredData));
  }, [filteredData, dispatch]);

  // Handle filter selection
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={classes.filterData}>
      <label htmlFor="">Filter by Location</label>
      <select
        name="location"
        value={filter.location}
        onChange={handleFilterChange}
      >
        <option value="">Select Location</option>
        {[...new Set(data.map((review) => review.location))].map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      {/* Order Price Sort */}
      <label htmlFor="">Filter by Order Price</label>
      <select
        name="orderPrice"
        value={filter.orderPrice}
        onChange={handleFilterChange}
      >
        <option value="">Sort by Order Price</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>

      {/* Rating Filter */}
      <label htmlFor="">Filter by Rating</label>
      <select name="rating" value={filter.rating} onChange={handleFilterChange}>
        <option value="">Sort by Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};

export default ReviewDataFiltering;
