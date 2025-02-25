const express = require("express");
const router = express.Router();

// Import individual routes
const getReviewRoute = require("./getReviews");
const postReviewRoute = require("./postReviews");
const tagReviewRoute = require("./tagReview");

// Use them under "/api/auth"
router.use(getReviewRoute);
router.use(postReviewRoute);
router.use(tagReviewRoute);

module.exports = router;
