import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../../redux/actions/orderActions";
import "./OrderScreen.scss";

const OrderScreen = ({ match }) => {
  const orderID = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderID));
  }, [dispatch, orderID]);

  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    error,
    loading,
    order: {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      itemPrice,
      shippingPrice,
      totalPrice,
      _id,
    },
  } = orderDetails;
  console.log("ORDER DETAILS: ", orderDetails);
  console.log("LOADING: ", loading);
  console.log("ORDER ITEM: ", orderItems);
  console.log("SHIPPING ADDRESS: ", shippingAddress);
  console.log("PAYMENT METHOD: ", paymentMethod);
  console.log("TAX PRICE: ", taxPrice);
  console.log("ITEM PRICE: ", itemPrice);
  console.log("SHIPPING PRICE: ", shippingPrice);
  console.log("TOTAL PRICE: ", totalPrice);
  console.log("_ID: ", _id);

  // if (!loading) {
  //   const addDecimals = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2);
  //   };

  //   itemPrice = addDecimals(
  //     orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  //   );
  // }
  return (
    <>
      <div className="order-container">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <div>
            <div className="order-form">
              <h1>Order: {_id}</h1>

              <div className="order-shipping-address">
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address}, {shippingAddress.city}{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </div>
              <div className="order-payment-method">
                <strong>Payment Method: </strong>
                {paymentMethod}
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
                <h4>Items</h4>
                <p>₹{itemPrice}</p>
              </div>
              <div className="shipping-price">
                <h4>Shipping</h4>
                <p>₹{shippingPrice}</p>
              </div>
              <div className="tax-price">
                <h4>Tax</h4>
                <p>₹{taxPrice}</p>
              </div>
              <div className="shipping-price">
                <h2>Total</h2>
                <h2>₹{totalPrice}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
