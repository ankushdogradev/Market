const express = require("express");
const { authUser, getUserProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
