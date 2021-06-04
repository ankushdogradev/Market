import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./CartScreen.scss";

const CartScreen = ({ match, location, history }) => {
  const productID = match.params.id;

  // ?qty=34 will get split from "=" [1] index, that is next after "=" (34) otherwise qty=1
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  return (
    <>
      <h1>Shopping Cart</h1>
    </>
  );
};

export default CartScreen;
