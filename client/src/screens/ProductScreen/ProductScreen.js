import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "./../../redux/actions/productActions";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./ProductScreen.scss";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailProduct(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
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
      )}
    </>
  );
};

export default ProductScreen;
