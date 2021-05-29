import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

// or we could have wrote const Product = ( props ) => ...
// but then we have to write props.product._id and so on
const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="card-Link">
      <div className="card-container">
        <div className="card-header">
          <img className="card-img" src={product.image} alt="Product" />
        </div>
        <div className="card-content">
          <h2 className="card-name">{product.name}</h2>
          <p>{`Rating: ${product.rating}`}</p>
          <h2 className="card-price">{`₹${product.price}`}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
