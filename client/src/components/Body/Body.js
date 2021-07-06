import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import ProductScreen from "../../screens/ProductScreen/ProductScreen";
import CartScreen from "../../screens/CartScreen/CartScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import SignupScreen from "../../screens/SignupScreen/SignupScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import ShippingScreen from "../../screens/ShippingScreen/ShippingScreen";
import PaymentScreen from "../../screens/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "../../screens/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "../../screens/OrderScreen/OrderScreen";
import UserListScreen from "../../screens/UserListScreen/UserListScreen";

const Body = () => {
  return (
    <div className="content">
      <Route path="/admin/userlist" component={UserListScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/signup" component={SignupScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route exact path="/" component={HomeScreen} />
      <Route path="/product/:id" component={ProductScreen} />
      <Route exact path={["/cart/:id", "/cart"]} component={CartScreen} />
    </div>
  );
};

export default Body;
