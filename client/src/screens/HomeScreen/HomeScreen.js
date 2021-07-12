/**
 * TODO:
 * - Add Banner
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./HomeScreen.scss";

const HomeScreen = ({ match }) => {
  const keyword = match.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      <h1 className="heading">Best Selling Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="prod-row">
          {products.map((product) => (
            <div className="prod-col" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
