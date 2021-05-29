import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/Product/Product";
import "./HomeScreen.scss";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  //   As soon as component runs this will run
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Best Selling Products</h1>
      <div className="prod-row">
        {products.map((product) => (
          <div className="prod-col" key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
