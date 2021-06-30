require("dotenv").config({
  path: "C:/Users/dogra/Documents/Web Development/Portfolio/FullStack/market/.env",
});

const express = require("express");
const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
      success: false,
      status: error.status || 500,
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
