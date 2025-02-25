const express = require("express");
const ReviewModel = require("../../models/Review");
const authenticate = require("../../utils/auth/authenticate");
const router = express.Router();

router.get("/getreviews", authenticate, async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});
module.exports = router;
