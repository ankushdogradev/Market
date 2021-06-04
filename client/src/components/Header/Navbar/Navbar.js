import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "../MenuItems/MenuItems";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.scss";

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav className="nav-bg">
        <Link to={`/`} className="nav-Link">
          <img className="nav-logo" src={"/logo/logo.svg"} alt="Logo" />
        </Link>

        <div className="nav-menu-icon" onClick={handleClick}>
          <i
            className={`${
              clicked ? "fas fa-2x fa-times" : "fas fa-2x fa-bars"
            }`}
          />
        </div>

        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          <SearchBar />

          <Link to={`/cart`} className="nav-Link">
            <button className="nav-cart" href="#">
              <i className="fas fa-shopping-cart"></i> Cart
            </button>
          </Link>

          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <button className={item.cName} href={item.url}>
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
