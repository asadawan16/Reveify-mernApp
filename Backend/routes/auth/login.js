require("dotenv").config();
const express = require("express");
const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });
    //Check if user is blocked or not
    if (user.status === "inactive") {
      return res
        .status(403)
        .json({ error: "User is blocked. Request an unblock." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { id: user._id, role: user.role, status: user.status },
    });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
