import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { listUsers } from "../../redux/actions/userActions";
import "./UserListScreen.scss";

const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log(`Delete ${id}`);
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
          {users.map((user) => (
            <tr key={user._id}>
              <th>user._id</th>
              <th>user.name</th>
              <th>
                <a href={`mailto:${user.email}`}>user.email</a>
              </th>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                <Link to={`/user/${user._id}/edit`}>
                  <button>EDIT</button>
                </Link>
                <button onClick={() => deleteHandler(user._id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </div>
      )}
    </>
  );
};

export default UserListScreen;
