import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSteps.scss";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <div className="steps-nav">
        <ul>
          {/* <li>
            {step1 ? (
              <Link to="/login" className="steps-nav-link">
                <h3>Signin</h3>
              </Link>
            ) : (
              <Link to="/login" className="disabled-link steps-nav-link">
                <h3>Signin</h3>
              </Link>
            )}
          </li> */}
          <li>
            {step1 ? (
              <Link to="/shipping" className="steps-nav-link">
                <h3>Shipping</h3>
              </Link>
            ) : (
              <Link to="/shipping" className="disabled-link steps-nav-link">
                <h3>Shipping</h3>
              </Link>
            )}
          </li>
          <li>
            {step2 ? (
              <Link to="/payment" className="steps-nav-link">
                <h3>Payment</h3>
              </Link>
            ) : (
              <Link to="/payment" className="disabled-link steps-nav-link">
                <h3>Payment</h3>
              </Link>
            )}
          </li>
          <li>
            {step3 ? (
              <Link to="/placeorder" className="steps-nav-link">
                <h3>Place Order</h3>
              </Link>
            ) : (
              <Link to="/placeorder" className="disabled-link steps-nav-link">
                <h3>Place Order</h3>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default CheckoutSteps;
