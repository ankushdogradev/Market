import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/Product/Product";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  //   As soon as component runs this will run
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Best Selling Products</h1>
      {/* {products.map((product) => {
        console.log(product.name);
      })} */}
      <Product />
    </>
  );
};

export default HomeScreen;
