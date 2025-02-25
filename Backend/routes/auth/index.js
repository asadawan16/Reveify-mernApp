const express = require("express");
const router = express.Router();

const loginRoute = require("./login");
const signupRoute = require("./signup");

router.use(loginRoute);
router.use(signupRoute);

module.exports = router;
