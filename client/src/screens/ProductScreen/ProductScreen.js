import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
  createProduct,
} from "./../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../../redux/constants/productConstants";
import "./ProductScreen.scss";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductreview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Added");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const buyNowHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, qty));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
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
          <div>
            <h2>Reviews</h2>
            {console.log(product.reviews.length === 0)}
            {product.reviews.length === 0 && <h3>No Reviews!!</h3>}
            <div>
              {product.reviews.map((review) => (
                <ul key={review._id}>
                  <strong>{review.name}</strong>
                  <strong>{review.rating}</strong>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ul>
              ))}
              <div>
                <h2>Write a review: </h2>
                {errorProductreview && (
                  <ErrorMessage>{errorProductreview}</ErrorMessage>
                )}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <label>
                      Review:
                      <select
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      >
                        <option value="">Select..</option>
                        <option value="1">1- POOR</option>
                        <option value="2">2- BELOW AVERAGE</option>
                        <option value="3">3- AVERAGE</option>
                        <option value="4">4- Good</option>
                        <option value="5">5- Excellent</option>
                      </select>
                    </label>
                    <div>
                      <h3>comment</h3>
                      <textarea
                        // className=""
                        type="text"
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                ) : (
                  <h4>Please First: Login/Signup</h4>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
