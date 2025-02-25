const express = require("express");
const router = express.Router();

// Import individual routes
const loginRoutes = require("./login");
const signupRoutes = require("./signup");

// Use them under "/api/auth"
router.use(loginRoutes);
router.use(signupRoutes);

module.exports = router;
