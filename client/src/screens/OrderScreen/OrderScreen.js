import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../../redux/constants/orderConstants";
import axios from "axios";
import "./OrderScreen.scss";

const OrderScreen = ({ match }) => {
  const orderID = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    error,
    loading,
    order,
    order: {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      itemPrice,
      shippingPrice,
      totalPrice,
      _id,
      user,
      isPaid,
      isDelivered,
    },
  } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientID } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      (Object.keys(orderItems).length === 0 &&
        Object.keys(shippingAddress).length === 0) ||
      successPay
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderID));
    } else if (Object.keys(isPaid).length === 0) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderID, successPay, orderItems, shippingAddress, isPaid]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);

    dispatch(payOrder(orderID, paymentResult));
  };

  return (
    <>
      <div className="order-container">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <div className="order-content">
            <div className="order-form">
              <h1>ORDER ID: </h1>
              <h1>{_id}</h1>
              <div className="order-shipping-address">
                <h2>SHIPPIING:</h2>
                <p>
                  <strong>Name: </strong>
                  {user.name}
                </p>
                <p>
                  <strong>Email: </strong> {user.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address}, {shippingAddress.city}{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
                {isDelivered ? (
                  <strong className="delivered"> [DELIVERED] </strong>
                ) : (
                  <strong className="not-delivered"> [NOT DELIVERED] </strong>
                )}
              </div>
              <div className="order-payment-method">
                <h2>PAYMENT METHOD: </h2>
                {paymentMethod}
                {console.log("isPaid: ", isPaid)}
                {isPaid ? (
                  <strong className="paid"> [PAID] </strong>
                ) : (
                  <strong className="not-paid"> [NOT PAID] </strong>
                )}
              </div>

              <div className="order-items">
                <h2> ORDERED ITEMS:</h2>
                {orderItems.length === 0 ? (
                  <ErrorMessage>Order is empty</ErrorMessage>
                ) : (
                  <div className="order-list-container">
                    {orderItems.map((item, index) => (
                      <div className="order-list" key={index}>
                        <div className="order-list-image">
                          <Link
                            className="order-nav-Link"
                            to={`/product/₹${item.productID}`}
                          >
                            <img src={item.image} alt={`${item.name} :(`} />
                          </Link>
                        </div>
                        <div className="order-list-name">
                          <Link
                            className="order-nav-Link"
                            to={`/product/₹${item.productID}`}
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="order-list-qtyPrice">
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
                <strong>₹{itemPrice}</strong>
              </div>
              <div className="shipping-price">
                <h2>SHIPPING PRICE: </h2>
                <strong>₹{shippingPrice}</strong>
              </div>
              <div className="tax-price">
                <h2>TAX: </h2>
                <strong>₹{taxPrice}</strong>
              </div>
              <div className="shipping-price">
                <h2>TOTAL AMOUNT: </h2>
                <strong>₹{totalPrice}</strong>
              </div>
              {console.log("Is !Paid: ", !isPaid)}
              {!isPaid && (
                <div>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderScreen;

// console.log("ORDER DETAILS: ", orderDetails);
// console.log("LOADING: ", loading);
// console.log("ORDER ITEM: ", orderItems);
// console.log("SHIPPING ADDRESS: ", shippingAddress);
// console.log("PAYMENT METHOD: ", paymentMethod);
// console.log("TAX PRICE: ", taxPrice);
// console.log("ITEM PRICE: ", itemPrice);
// console.log("SHIPPING PRICE: ", shippingPrice);
// console.log("TOTAL PRICE: ", totalPrice);
// console.log("_ID: ", _id);
