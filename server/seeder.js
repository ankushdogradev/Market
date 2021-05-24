require("dotenv").config({
  path: "C:/Users/dogra/Documents/Web Development/Portfolio/FullStack/market/.env",
});

const mongoose = require("mongoose");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(`Data Import Error:${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Data Destroy Error:${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
