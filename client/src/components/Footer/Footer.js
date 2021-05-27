import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="foo">
      {/* Main Footer */}
      <div className="foo-main">
        <div className="foo-main-col">
          <img className="foo-main-logo" src={"/logo/logo.svg"} alt="Logo" />
        </div>
        <div className="foo-main-col">
          <h2>Get to know us</h2>
          <ul>
            <li>
              <a
                href="https://github.com/ankushdogradev"
                target="_blank"
                rel="noopener noreferrer"
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ankushdogradev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shipping
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ankushdogradev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="foo-main-col">
          <h2>Contact Us</h2>
          <ul>
            <li>
              <a
                href="https://github.com/ankushdogradev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ankushdogradev"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
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
    </div>
  );
};

export default Footer;

// Fix Media querry
