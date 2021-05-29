import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
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
      <h1 className="heading">Best Selling Products</h1>
      <div className="prod-row">
        {products.map((product) => (
          <div className="prod-col" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
