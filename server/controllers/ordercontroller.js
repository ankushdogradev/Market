// Test Comment
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

//  @description: Update order to paid
//  @route: GET /api/orders/:id/pay
//  @access: Private
exports.updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order.save();

      res.json(updateOrder);
    } else {
      error = new Error("Order not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//  @description: GET logged in user orders
//  @route: GET /api/orders/myorders
//  @access: Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

//  @description: GET all orders
//  @route: GET /api/orders
//  @access: Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

//  @description: Update order to out for delivery
//  @route: GET /api/orders/:id/deliver
//  @access: Private/Admin
exports.updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();

      res.json(updateOrder);
    } else {
      error = new Error("Order not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
