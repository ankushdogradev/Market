import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { listOrders } from "../../redux/actions/orderActions";
import "./OrderListScreen.scss";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <div className="orderListScreen">
        <h1>ORDER STATUS</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <table className="order-list">
            <tbody>
              <tr>
                <th>ORDER ID</th>
                <th>USER NAME</th>
                <th>DATE</th>
                <th>TOTAL PIRCE</th>
                <th>PAYMENT METHOD</th>
                <th>ADDRESS</th>
                <th>DELVERED</th>
                <th></th>
              </tr>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{`₹${order.totalPrice}`}</td>
                  <td>
                    {order.paymentMethod}

                    {order.isPaid ? (
                      <strong className="paid">
                        {" "}
                        {`[PAID]: ${order.paidAt.substring(0, 10)}`}{" "}
                      </strong>
                    ) : (
                      <strong className="not-paid"> [NOT PAID] </strong>
                    )}
                  </td>
                  <td>
                    <p>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <strong className="delivered">
                        {" "}
                        {`[DELIVERED]: ${order.deliveredAt.substring(
                          0,
                          10
                        )}`}{" "}
                      </strong>
                    ) : (
                      <strong className="not-delivered">
                        {" "}
                        [NOT DELIVERED]{" "}
                      </strong>
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
    </>
  );
};

export default OrderListScreen;
