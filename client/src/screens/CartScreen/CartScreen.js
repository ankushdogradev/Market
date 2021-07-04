// TODO:
// * mobile responsive
// * Product delete itself from list after adding.

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <div className="cart-heading">
        <h1>Cart</h1>
      </div>
      <div className="cart-data">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <img
              src="./images/emptyCart/emptyCart.svg"
              alt="Nothing here :("
            ></img>
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
              <div className="cart-product-list">
                {cartItems.map((item) => (
                  <div className="cart-product-item" key={item.productID}>
                    <ul>
                      <div className="cart-productimage">
                        <li>
                          <h3>PRODUCT</h3>
                        </li>
                        <li>
                          <Link to={`/product/${item.productID}`}>
                            <img src={item.image} alt={item.name}></img>
                          </Link>
                        </li>
                        <li>{item.name}</li>
                      </div>
                      <div>
                        <li>
                          <h3>PRICE</h3>
                        </li>
                        <li>₹{item.price}</li>
                      </div>
                      <div>
                        <li>
                          <h3>QUANTITY</h3>
                        </li>
                        <li>
                          <div className="product-select">
                            <select
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.productID,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </li>
                      </div>

                      <li>
                        <button
                          onClick={() => removeFromCartHandler(item.productID)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="cart-total">
              <h2>
                Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Amount
              </h2>
              <h1>
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h1>
              <button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartScreen;
