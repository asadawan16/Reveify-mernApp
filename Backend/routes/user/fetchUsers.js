const express = require("express");
const router = express.Router();
const UserModel = require("../../models/user");
const authenticate = require("../../utils/auth/authenticate");

router.get("/fetchusers", authenticate, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
