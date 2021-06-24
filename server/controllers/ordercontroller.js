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
      totalProce,
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
        totalProce,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};
