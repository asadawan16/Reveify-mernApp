const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  agentId: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
    index: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  discountApplied: {
    type: Number,
    default: 0,
  },
  customerId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
      default: "Neutral",
    },
    performance: {
      type: String,
      enum: ["Fast", "Average", "Slow"],
      default: "Average",
    },
    accuracy: {
      type: String,
      enum: ["Order Accurate", "Order Mistake"],
      default: "Order Accurate",
    },
  },
  complaints: [
    {
      type: String,
      enum: [
        "Late Delivery",
        "Damaged Package",
        "Wrong Item",
        "Rude Behavior",
        "Missing Item",
      ],
      default: [],
    },
  ],
});

// Add indexes for frequently queried fields
reviewSchema.index({ agentId: 1, location: 1 });
reviewSchema.index({ "tags.sentiment": 1 });
reviewSchema.index({ "tags.performance": 1 });
const ReviewModel = mongoose.model("Review", reviewSchema);
module.exports = ReviewModel;
