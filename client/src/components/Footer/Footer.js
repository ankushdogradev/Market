import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        {/* Main Footer */}
        <div className="foo-main">
          <div className="foo-main-col">
            <img className="foo-main-logo" src={"/logo/logo.svg"} alt="Logo" />
          </div>
          <div className="foo-main-col">
            <h2>Get to know us</h2>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="foo-main-col">
            <h2>Contact Us</h2>
            <ul>
              <li>
                <a href="#">Github</a>
              </li>
              <li>
                <a href="#">linkedin</a>
              </li>
              <li>
                <p>Email: ankushdogradev@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Footer */}
        <div className="fo-sec">
          <div className="foo-sec-row">
            <p className="foo-sec-legal">
              &copy;{new Date().getFullYear()} Designed & programmed by Ankush
              Dogra | CC: Creative Commons
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

// Fix Media querry
