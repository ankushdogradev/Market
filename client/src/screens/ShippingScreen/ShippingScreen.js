import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import "./ShippingScreen.scss";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push("/payment");
  };
  return (
    <>
      <div className="shipping-container">
        <h1>Shipping</h1>
        <div className="shipping-form">
          <form onSubmit={submitHandler}>
            <div className="shipping-form-items">
              <input
                className="shipping-input"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="shipping-input"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                className="shipping-input"
                type="text"
                pattern="[0-9]{6}"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                className="shipping-input"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

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

export default ShippingScreen;
