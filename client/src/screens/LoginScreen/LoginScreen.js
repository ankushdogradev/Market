/*
 * https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/
 * https://www.youtube.com/watch?v=mUdo6w87rh4
 * https://www.w3schools.com/html/html_forms.asp
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { login } from "../../redux/actions/userActions";
import "./LoginScreen.scss";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <form>
            <div className="login-form-items">
              <input
                className="login-input"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button>Login</button>
              <h4>OR</h4>
              <div className="login-form-social">
                <button className="social">
                  <img className="googleLogo" src="/logo/google.svg" alt="G" />{" "}
                  Login with Google
                </button>
                <button className="social social-github">
                  <img className="githubLogo" src="/logo/github.svg" alt="GH" />{" "}
                  Login with GitHub
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
