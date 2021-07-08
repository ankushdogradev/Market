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

//  @description: Delete a Product
//  @route: DELETE /api/product/:id
//  @access: Private/Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      const error = new Error("Product not Found!");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//  @description: Create a Product
//  @route: POST /api/product/
//  @access: Private/Admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample Description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

//  @description: Update a Product
//  @route: PUT /api/product/:id
//  @access: Private/Admin
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      const error = new Error("Product not Found!");
      error.status = 404;
      next(error);
    }

    const createdProduct = await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
