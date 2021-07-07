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
      error.status = 401;
      next(error);
    }
  } catch (error) {
    error = new Error("Invalid user data");
    error.status = 401;
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

//  @description: Update user profile
//  @route:       PUT /api/users/profile
//  @access:      Private
exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//  @description: Get all users
//  @route:       GET /api/users
//  @access:      Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    error = new Error("cant find any user's profile");
    error.status = 404;
    next(error);
  }
};

//  @description: Delete user
//  @route:       DELETE /api/users
//  @access:      Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      const error = new Error("User Not Found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    error = new Error("cant find any user's profile");
    error.status = 404;
    next(error);
  }
};

//  @description: Get user by id
//  @route:       GET /api/users:id
//  @access:      Private/Admin
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      const error = new Error("User Not Found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    error = new Error("cant find any user's profile");
    error.status = 404;
    next(error);
  }
};

//  @description: Update user
//  @route:       PUT /api/users/:id
//  @access:      Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      const error = new Error("Sorry, user Not Found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
