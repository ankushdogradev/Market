import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { register } from "../../redux/actions/userActions";
import "./SignupScreen.scss";

const SignupScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    !regex.test(password)
      ? setMessage(
          "Password must contain atleast 8 characters & one alphabet, number & special character"
        )
      : password !== confirmPassword
      ? setMessage("Passwords do not match!")
      : dispatch(register(name, email, password));
  };

  return (
    <>
      <div className="signup-container">
        {message && <ErrorMessage error={message} />}
        {error && <ErrorMessage error={error} />}
        <div className="signup-form">
          <h1>Signup</h1>
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={submitHandler}>
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
                <input
                  className="signup-input"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit" value="submit">
                  Signup
                </button>
                <h4>OR</h4>
                <div className="signup-form-social">
                  <button className="social">
                    <img
                      className="googleLogo"
                      src="/logo/google.svg"
                      alt="G"
                    />{" "}
                    Signup with Google
                  </button>
                  <button className="social social-github">
                    <img
                      className="githubLogo"
                      src="/logo/github.svg"
                      alt="GH"
                    />{" "}
                    Signup with GitHub
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
