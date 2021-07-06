const admin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      const error = new Error("Not Authorized As An Admin");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = admin;
