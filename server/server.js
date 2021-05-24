const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products.js");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello..");
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
