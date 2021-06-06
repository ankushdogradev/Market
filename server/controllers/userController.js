/*
    TODO:
    *   Fix Error Handeling Response (Processing...)
    *   Start From JWT
    *   Read about Error Handelling First:https://expressjs.com/en/guide/error-handling.html
*/

const User = require("../models/userModel");

//  @description: Auth user & Get token
//  @route: GET /api/users/login
//  @access: Public
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
        token: null,
      });
    }
  } catch (error) {
    next(new Error("Invalid email or password"));
  }
};
