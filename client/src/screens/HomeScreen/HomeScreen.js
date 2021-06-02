import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./HomeScreen.scss";

const HomeScreen = () => {
  const dispatch = useDispatch();

  //   As soon as component runs, useEffect() run's
  useEffect(() => {
    // Fire/calls listProducts:Action/funtion
    dispatch(listProducts());
  }, [dispatch]);

  //  here we are taking data from productList reducer stored in store.js
  const productList = useSelector((state) => state.productList);
  // we are De-structuring and pulling what we want out from productList i.e.: loading, error, product.
  const { loading, error, products } = productList;

  return (
    <>
      <h1 className="heading">Best Selling Products</h1>

      {/* If loading true -> loading icon, 
      else if error -> show error, 
      else show & pass data in product card */}

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
