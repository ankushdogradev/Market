// TODO:
// * Rewatch Both Videos & UNDERSTAND
// * Check your code again
// * Look answers on youtube and overflow
// * ASk

import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { login } from "../../redux/actions/userActions";
import "./LoginScreen.scss";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // const redirect = location.search ? location.search.split("=")[1] : "/";
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push(redirect);
  //   }
  // }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage error={error} />
          ) : (
            <form onSubmit={submitHandler}>
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
                <button type="submit" value="Submit">
                  Login
                </button>

                <h4>OR</h4>

                <div className="login-form-social">
                  <button className="social">
                    <img
                      className="googleLogo"
                      src="/logo/google.svg"
                      alt="G"
                    />{" "}
                    Login with Google
                  </button>
                  <button className="social social-github">
                    <img
                      className="githubLogo"
                      src="/logo/github.svg"
                      alt="GH"
                    />{" "}
                    Login with GitHub
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
