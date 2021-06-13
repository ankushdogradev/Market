import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
// import { signup } from "../../redux/actions/userActions";
import "./SignupScreen.scss";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <h1>Signup</h1>
          <form>
            <div className="signup-form-items">
              <input
                className="signup-input"
                type="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="signup-input"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="signup-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button>Signup</button>
              <h4>OR</h4>
              <div className="signup-form-social">
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

export default SignupScreen;

/*
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
*/
