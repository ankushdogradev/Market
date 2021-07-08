import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import {
  listProductDetails,
  updateProduct,
} from "../../redux/actions/productActions";
import "./ProductEditScreen.scss";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productID = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productID) {
        dispatch(listProductDetails(productID));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.Image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.setCountInStock);
        setDescription(product.description);
      }
    }
  }, [
    history,
    successUpdate,
    dispatch,
    productID,
    product.Image,
    product._id,
    product.brand,
    product.name,
    product.price,
    product.category,
    product.setCountInStock,
    product.description,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productID,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <div className="productEdit-container">
        {loadingUpdate && <Loader />}
        {errorUpdate && <ErrorMessage>{errorUpdate}</ErrorMessage>}
        <div className="productEdit-form">
          <h1>EDIT PRODUCT</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="productEdit-form-items">
                <div className="item">
                  <h3>PRODUCT NAME</h3>
                  <input
                    className="productEdit-input"
                    type="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="item">
                  <h3>PRICE</h3>
                  <input
                    className="productEdit-input"
                    type="number"
                    placeholder="Price"
                    value={`₹${price}`}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="item">
                  <h3>PRODUCT IMAGE</h3>
                  <input
                    className="productEdit-input"
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="item">
                  <h3>BRAND NAME</h3>
                  <input
                    className="productEdit-input"
                    type="text"
                    placeholder="Brand Name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="item">
                  <h3>CATEGORY</h3>
                  <input
                    className="productEdit-input"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="item">
                  <h3>COUNT IN STOCK</h3>
                  <input
                    className="productEdit-input"
                    type="number"
                    placeholder="Count In Stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
                <div className="item">
                  <h3>DESCRIPTION</h3>
                  <textarea
                    className="productEdit-input description"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button type="submit" value="submit">
                  UPDATE
                </button>
                <Link to="/admin/productlist">
                  <button>Go Back</button>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductEditScreen;
