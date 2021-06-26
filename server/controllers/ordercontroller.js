const Order = require("../models/orderModel");

//  @description: Create New Order
//  @route: POST /api/orders
//  @access: Private
exports.addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      error = new Error("No Order Items");
      error.status = 400;
      next(error);
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};

//  @description: Get Order By ID
//  @route: GET /api/orders/:id
//  @access: Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      error = new Error("Order not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
