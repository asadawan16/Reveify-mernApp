const express = require("express");
const router = express.Router();
const UserModel = require("../../models/user");
const authenticate = require("../../utils/auth/authenticate");
const authorizeAdmin = require("../../utils/auth/authorize");

router.patch(
  "/updatestatus/:id",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Toggle user status
      const newStatus = user.status === "active" ? "inactive" : "active";

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        { $set: { status: newStatus } },
        { new: true }
      );

      res.json({
        message: `User successfully ${newStatus === "active" ? "unblocked" : "blocked"}`,
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ error: "Failed to update user status" });
    }
  }
);

module.exports = router;
