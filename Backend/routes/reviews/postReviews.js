const express = require("express");
const router = express.Router();
const ReviewModel = require("../../models/Review");
const { analyzeReview } = require("../../utils/ReviewAnalysis/analyzeReview");
const authenticate = require("../../utils/auth/authenticate");

router.post("/submit-reviews", authenticate, async (req, res) => {
  try {
    const {
      agentId,
      agentName,
      location,
      reviewText,
      rating,
      orderPrice,
      discountApplied,
      customerId,
    } = req.body;
    if (!agentId) {
      return res.status(400).json({ error: "agentId is required" });
    }
    const { tags, complaints } = analyzeReview(reviewText, rating);

    const newReview = new ReviewModel({
      agentId,
      agentName,
      location,
      reviewText,
      rating,
      orderPrice,
      discountApplied,
      customerId,
      tags,
      complaints,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review created successfully", data: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
});

module.exports = router;
