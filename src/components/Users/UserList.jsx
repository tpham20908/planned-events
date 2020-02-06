import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { rootApi } from "../../constants";

const User = ({ user, deleteUser }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.createdAt}</td>
    <td>
      <Link to={`user/edit/${user.userId}`}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          deleteUser(user.userId);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${rootApi}/users`).then(response => {
      setUsers(response.data);
    });
  }, []);

  const userList = () =>
    users.map(currentUser => (
      <User
        user={currentUser}
        deleteUser={deleteUser}
        key={currentUser.userId}
      />
    ));

  const deleteUser = userId => {
    axios
      .delete(`${rootApi}/users/${userId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    const newUsers = users.filter(user => user.userId !== userId);
    setUsers(newUsers);
  };

  return (
    <div>
      <h3>User List</h3>
      <Link className="btn btn-primary btn-lg my-2" to={`user/create`}>
        Create New User
      </Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
};

export default UserList;
