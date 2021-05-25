require("dotenv").config({
  path: "C:/Users/dogra/Documents/Web Development/Portfolio/FullStack/market/.env",
});

const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

// Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/", productRoutes);
// app.use("/api/", orderRoutes);
// app.use("/api/", uploadRoutes);
// app.use("/api/", userRoutes);

// Check's If the route is not defined and passes 404 error
app.use((req, res, next) => {
  const error = new Error(`Requested URL: ${req.path} not found!`);
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      Success: false,
      Status: error.status || 500,
      Message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
