import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductScreen.scss";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/product/${match.params.id}`);
      setProduct(data.product);
    };
    fetchProduct();
  }, [match.params.id]);

  return (
    <>
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt="Product" />
        </div>
        <div className="product-content">
          <h1>{product.name}</h1>
          <h3>{`Price: ₹${product.price}`}</h3>
          <h3>{`Rating: ${product.rating}`}</h3>
          {product.countInStock > 0 ? (
            <h4 className="product-instock">In Stock</h4>
          ) : (
            <h4 className="product-nostock">Out of Stock</h4>
          )}
          {product.countInStock > 0 ? (
            <div className="product-inline">
              <p>Qty Select</p>
              <button>Add to Cart</button>{" "}
            </div>
          ) : (
            <div className="product-inline">"</div>
          )}
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
