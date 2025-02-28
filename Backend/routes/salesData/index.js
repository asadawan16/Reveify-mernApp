const express = require("express");
const router = express.Router();

const combinedRoutes = require("./routes/combined");
router.use(combinedRoutes);
module.exports = router;
