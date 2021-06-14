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
    } else {
      const error = new Error("Invalid email or password");
      error.status = 400;
      next(error);
    }
  } catch (error) {
    error = new Error("Invalid user data");
    error.status = 400;
    next(error);
  }
};

//  @description: Register a new User
//  @route:       POST /api/users/users
//  @access:      Public
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("User already exists");
      error.status = 400;
      next(error);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//  @description: Get user profile
//  @route:       GET /api/users/profile
//  @access:      Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  } catch (error) {
    error = new Error("User not found");
    error.status = 404;
    next(error);
  }
};
