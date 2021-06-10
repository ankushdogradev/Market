import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
// import { signup } from "../../redux/actions/userActions";
import "./SignupScreen.scss";

const SignupScreen = () => {
  return (
    <>
      <div className="sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="sign-up-social">
            <a href="#" className="social">
              Github
            </a>
            <a href="#" className="social">
              Google
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignupScreen;
