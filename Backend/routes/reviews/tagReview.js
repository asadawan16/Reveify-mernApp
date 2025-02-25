//  Manual tagging of reviews
const express = require("express");
const router = express.Router();
const ReviewModel = require("../../models/Review");
const authenticate = require("../../utils/auth/authenticate");
const authorizeAdmin = require("../../utils/auth/authorize");

router.put("/updatetag/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { sentiment, performance, accuracy, complaints } = req.body;

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "tags.sentiment": sentiment,
          "tags.performance": performance,
          "tags.accuracy": accuracy,
          complaints: complaints || [],
        },
      },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review updated successfully", data: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

module.exports = router;
