import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import ProductScreen from "../../screens/ProductScreen/ProductScreen";
import CartScreen from "../../screens/CartScreen/CartScreen";

const Body = () => {
  return (
    <div className="content">
      <Route path="/" component={(props) => <HomeScreen {...props} />} exact />
      <Route
        path="/product/:id"
        component={(props) => <ProductScreen {...props} />}
      />
      <Route
        path="/cart/:id?"
        component={(props) => <CartScreen {...props} />}
      />
    </div>
  );
};

export default Body;
