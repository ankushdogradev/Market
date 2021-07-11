import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../redux/actions/userActions";
import SearchBar from "../SearchBar/SearchBar";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import "./Navbar.scss";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const dropdownRef = useRef(null);
  const [drop, setDrop] = useDetectOutsideClick(dropdownRef, false);
  const [adminDrop, setAdminDrop] = useDetectOutsideClick(dropdownRef, false);

  const dispatch = useDispatch();

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const logoutHandler = () => {
    setDrop(!drop);
    dispatch(logout());
  };

  const menuClick = () => {
    setClicked(!clicked);
  };

  const dropClick = () => {
    setDrop(!drop);
  };

  const adminDropClick = () => {
    setAdminDrop(!adminDrop);
  };

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
          {userInfo && userInfo.isAdmin && (
            <div className="nav-drop-container">
              <button className="nav-drop" onClick={adminDropClick}>
                ADMIN CONTROL
              </button>
              <div
                ref={dropdownRef}
                className={`nav-drop-content ${
                  adminDrop ? "active" : "inactive"
                }`}
              >
                <ul>
                  <Link to={`/admin/userList`} className="nav-Link">
                    <li id="item1">
                      <h4>USERS</h4>
                    </li>
                  </Link>
                  <Link to={`/admin/productlist`} className="nav-Link">
                    <li>
                      <h4>PRODUCTS</h4>
                    </li>
                  </Link>
                  <Link to={`/admin/orderlist`} className="nav-Link">
                    <li id="item2">
                      <h4>ORDERS</h4>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
