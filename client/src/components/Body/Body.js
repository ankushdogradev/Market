import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import ProductScreen from "../../screens/ProductScreen/ProductScreen";
import CartScreen from "../../screens/CartScreen/CartScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import SignupScreen from "../../screens/SignupScreen/SignupScreen";

const Body = () => {
  return (
    <div className="content">
      <Route path="/login" component={LoginScreen} />
      <Route path="/signup" component={SignupScreen} />
      <Route exact path="/" component={HomeScreen} />
      <Route path="/product/:id" component={ProductScreen} />
      <Route exact path={["/cart/:id", "/cart"]} component={CartScreen} />
    </div>
  );
};

export default Body;
