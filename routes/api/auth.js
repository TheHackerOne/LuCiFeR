const express = require("express");
const router = express.Router();

// @route    GET api/users
// @access   Public
router.get("/", (req, res, next) => {
	res.send("auth route");
});

module.exports = router;
