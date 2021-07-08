import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "./../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./ProductScreen.scss";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const buyNowHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, qty));
  };

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
                {product.countInStock > 0 && (
                  <div className="product-select">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button onClick={addToCartHandler}>Add To Cart</button>
                <button onClick={buyNowHandler}>Buy Now</button>
              </div>
            ) : (
              <div className="product-inline"></div>
            )}
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
