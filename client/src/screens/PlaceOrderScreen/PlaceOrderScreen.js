import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderActions";
import "./PlaceOrderScreen.scss";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {
    payment: { paymentMethod },
    shippingAddress,
    cartItems,
  } = cart;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemPrice > 1000 ? 0 : 100);
  cart.taxPrice = addDecimals(
    cart.cartItems
      .reduce((acc, item) => acc + item.price * item.qty * 0.1, 0)
      .toFixed(2)
  );
  cart.totalPrice = addDecimals(
    (
      Number(cart.itemPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
        },
        paymentMethod: paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <div className="placeOrder-container">
        <CheckoutSteps step1 step2 step3 />
        <div className="placeOrder-content ">
          <div className="placeOrder-form">
            <h1>shipping</h1>

            <div className="placeOrder-shipping-address">
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>

            <div className="placeOrder-payment-method">
              {/* ADd paymen method from local storage */}
              <strong>Payment Method: </strong>
              {paymentMethod}
            </div>

            <div className="placeOrder-items">
              <h2> ORDERED ITEMS:</h2>
              {cartItems.length === 0 ? (
                <ErrorMessage>Your Cart is empty</ErrorMessage>
              ) : (
                <div className="placeOrder-list-container">
                  {cartItems.map((item, index) => (
                    <div className="placeOrder-list" key={index}>
                      <div className="placeOrder-list-image">
                        <Link
                          className="placeOrder-nav-Link"
                          to={`/product/₹${item.productID}`}
                        >
                          <img src={item.image} alt={`${item.name} :(`} />
                        </Link>
                      </div>
                      <div className="placeOrder-list-name">
                        <Link
                          className="placeOrder-nav-Link"
                          to={`/product/₹${item.productID}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="placeOrder-list-qtyPrice">
                        {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="summery">
            <h1>Order Summery</h1>
            <div className="item-price">
              <h2>ITEM PRICE: </h2>
              <strong>₹{cart.itemPrice}</strong>
            </div>
            <div className="shipping-price">
              <h2>SHIPPING PRICE: </h2>
              <strong>₹{cart.shippingPrice}</strong>
            </div>
            <div className="tax-price">
              <h2>TAX: </h2>
              <strong>₹{cart.taxPrice}</strong>
            </div>
            <div className="shipping-price">
              <h2>TOTAL AMOUNT: </h2>
              <strong>₹{cart.totalPrice}</strong>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="placeOrder-button">
              <button
                type="button"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
