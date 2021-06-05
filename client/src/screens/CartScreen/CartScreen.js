import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import "./CartScreen.scss";

const CartScreen = ({ match, location, history }) => {
  const productID = match.params.id;

  // ?qty=34 will get split from "=" [1] index, that is next after "=" (34) otherwise qty=1
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  return (
    <>
      <div className="cart-heading">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-data">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <img src="./images/emptyCart/emptyCart.svg"></img>
            <h1>
              Your cart is empty,{" "}
              <Link className="cart-link" to="/">
                GO BACK
              </Link>
            </h1>
          </div>
        ) : (
          <div className="cart-full">
            <div className="cart-product">
              <div className="cart-product-heading">
                <ul>
                  <li>PRODUCT</li>
                  <li>PRICE</li>
                  <li>QTY</li>
                  <li>Delete</li>
                </ul>
              </div>
              <div className="cart-product-list">
                {cartItems.map((item) => (
                  <div className="cart-product-item" key={item.productID}>
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="cart-checkout">
              {/* 
                  Total('x') items: ₹ 'xxx'
                  Proceed to Checkout Button
              */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartScreen;
