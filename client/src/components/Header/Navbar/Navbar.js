import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/userActions";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.scss";

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menuClick = () => {
    setClicked(!clicked);
  };

  const dropClick = () => {
    setDrop(!drop);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDrop(!drop);
      }
    };

    if (drop) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [drop]);

  return (
    <>
      <nav className="nav-bg">
        <Link to={`/`} className="nav-Link">
          <img className="nav-logo" src={"/logo/logo.svg"} alt="Logo" />
        </Link>

        <div className="nav-menu-icon" onClick={menuClick}>
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
          {userInfo ? (
            <div className="nav-drop-container">
              <button className="nav-drop" onClick={dropClick}>
                {userInfo.name}
              </button>
              <div
                ref={dropdownRef}
                className={`nav-drop-content ${drop ? "active" : "inactive"}`}
              >
                <ul>
                  <Link to={`/profile`} className="nav-Link">
                    <li id="item1">
                      <h4>PROFILE</h4>
                    </li>
                  </Link>

                  <li id="item2" onClick={logoutHandler}>
                    <h4>LOGOUT</h4>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link to={`/login`} className="nav-Link">
                <button className="nav-links">Login</button>
              </Link>

              <Link to={`/signup`} className="nav-Link">
                <button className="nav-links" id="nav-signup">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
