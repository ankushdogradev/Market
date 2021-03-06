import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listMyOrders } from "../../redux/actions/orderActions";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userActions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import "./ProfileScreen.scss";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name || !user || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user, success]);

  const passwordHandler = (e) => {
    e.preventDefault();

    !regex.test(password)
      ? setMessage(
          "Password must contain atleast 8 characters & one alphabet, number & special character"
        )
      : password !== confirmPassword
      ? setMessage("Passwords do not match!")
      : dispatch(updateUserProfile({ id: user._id, password }));
  };

  const enameHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile">
          {message && <ErrorMessage error={message} />}
          {error && <ErrorMessage error={error} />}
          {success && <Message success={"Profile Updated"} />}
          <div className="profile-form">
            <h2>User Profile</h2>
            {loading ? (
              <Loader />
            ) : (
              <div>
                <form onSubmit={enameHandler}>
                  <div className="profile-form-items">
                    <h3> Update Name or Email</h3>
                    <input
                      className="profile-input"
                      type="name"
                      placeholder="New Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="profile-input"
                      type="email"
                      placeholder="New Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" value="submit">
                      Update
                    </button>
                  </div>
                </form>
                <form onSubmit={passwordHandler}>
                  <div className="profile-form-items">
                    <h3>Update Password</h3>
                    <input
                      className="profile-input"
                      type="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      className="profile-input"
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" value="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="orders">
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <ErrorMessage>{errorOrders}</ErrorMessage>
          ) : (
            <table className="order-items">
              <tbody>
                <tr>
                  <th>ORDER ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <p className="done">
                          PAID ON: {order.paidAt.substring(0, 10)}
                        </p>
                      ) : (
                        <p className="not-done">Not Paid</p>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <p className="done">
                          DELIVERED ON: {order.deliveredAt.substring(0, 10)}
                        </p>
                      ) : (
                        <p className="not-done">Not Delivered</p>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button>DETAILS</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
