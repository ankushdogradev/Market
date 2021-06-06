const Product = require("../models/productModel");

//  @description: Fetch all products
//  @route: GET /api/products
//  @access: Public
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

//  @description: Fetch a single product
//  @route: GET /api/product/:id
//  @access: Public
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(new Error("Product not Found!"));
  }
};
