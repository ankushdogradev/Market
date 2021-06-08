const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);

      error = new Error("Not Authorized!!");
      error.status = 401;
      next(error);
    }
  }

  if (!token) {
    const error = new Error("Not Authorized!!, No Token!!");
    error.status = 401;
    next(error);
  }
};

module.exports = protect;
