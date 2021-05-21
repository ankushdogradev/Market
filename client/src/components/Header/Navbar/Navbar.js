import React, { useState } from "react";
import { MenuItems } from "../MenuItems/MenuItems";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css";

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav className="nav-bg">
        <img className="nav-logo" src={"/logo/logo.svg"} alt="Logo" />

        <div className="nav-menu-icon" onClick={handleClick}>
          <i
            className={`${
              clicked ? "fas fa-2x fa-times" : "fas fa-2x fa-bars"
            }`}
          />
        </div>

        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          <SearchBar />

          <button className="nav-cart" href="#">
            <i className="fas fa-shopping-cart"></i> Cart
          </button>

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
