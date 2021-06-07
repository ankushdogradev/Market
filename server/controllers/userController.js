/*
    TODO:
    *   Fix Error Handeling Response (Processing...)
    *   Start From JWT
    *   Read about Error Handelling First:https://expressjs.com/en/guide/error-handling.html
*/

const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//  @description: Auth user & Get token
//  @route:       POST /api/users/login
//  @access:      Public
exports.authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    next(new Error("Invalid email or password"));
  }
};

//  @description: Get user profile
//  @route:       GET /api/users/profile
//  @access:      Private
exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    next(new Error("User not found"));
  }
};
