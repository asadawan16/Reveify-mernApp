const express = require("express");
const router = express.Router();

const getFetchUserRoute = require("./fetchUsers");
const getManageStatusRoute = require("./manageUserStatus");

router.use(getFetchUserRoute);
router.use(getManageStatusRoute);

module.exports = router;
