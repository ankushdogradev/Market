import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import "./PaymentScreen.scss";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  if (!shippingAddress) {
    history.push("/placeorder");
  }

  const [paymentMethod, setPaymentMethod] = useState("RazorPay");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));

    history.push("/placeorder");
  };
  return (
    <>
      <div className="payment-container">
        <CheckoutSteps step1 step2 />
        <div className="payment-form">
          <h1>Payment Method</h1>
          <form onSubmit={submitHandler}>
            <div className="payment-form-items">
              <div className="radio">
                <input
                  className="payment-input"
                  type="radio"
                  value="RazorPay"
                  id="RazorPay"
                  name="paymentMethod"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <h3>RazorPay</h3>
              </div>
              <div className="radio">
                <input
                  className="payment-input"
                  type="radio"
                  placeholder="PayPal"
                  value="Paypal"
                  id="PayPal"
                  name="paymentMethod"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <h3>PayPal</h3>
              </div>
              <button type="submit" value="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
