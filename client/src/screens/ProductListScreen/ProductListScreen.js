import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { listProducts } from "../../redux/actions/productActions";
import "./ProductListScreen.scss";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Do you want to delete the user?")) {
      // dispatch(deleteProducts(id));
    }
  };

  const createProductHandler = () => {
    console.log("Product Created");
  };

  return (
    <>
      <div className="productListScreen">
        <div className="productList-head">
          <h1>PRODUCTS</h1>
          <button onClick={createProductHandler}>
            <i className="fas fa-plus"></i> CREATE PRODUCT
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <table className="product-list">
            <tbody>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATAGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`admin/product/${product._id}/edit`}>
                      <button>EDIT</button>
                    </Link>
                    <button onClick={() => deleteHandler(product._id)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductListScreen;
