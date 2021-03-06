const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} = require("../controllers/productController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.route("/products").get(getProducts).post(protect, admin, createProduct);
router.route("/products/:id/reviews").post(protect, createProductReview);
router
  .route("/product/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;
