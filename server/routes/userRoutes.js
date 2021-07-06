const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);
module.exports = router;
