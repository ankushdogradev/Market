// Fix react router thingi
// COMPLETE MAN COMPLETE YOU CAN DO THIS

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { getUserDetails, updateUser } from "../../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../../redux/constants/userConstants";
import "./UserEditScreen.scss";

const UserEditScreen = ({ match, history }) => {
  const userID = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userID) {
        dispatch(getUserDetails(userID));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, user, userID, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: userID, name, email, isAdmin }));
  };

  return (
    <>
      <div className="userEdit-container">
        {error && <ErrorMessage error={error} />}
        <div className="userEdit-form">
          <h1>EDIT USER</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <ErrorMessage>{errorUpdate}</ErrorMessage>}
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="userEdit-form-items">
                <input
                  className="userEdit-input"
                  type="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="userEdit-input"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="check">
                  <h3>ADMIN</h3>
                  <input
                    className="check-box"
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </div>
                <button type="submit" value="submit">
                  UPDATE
                </button>
                <Link to="/admin/userlist">
                  <button>Go Back</button>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEditScreen;
