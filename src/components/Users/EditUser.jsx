import React, { useEffect, useState } from "react";
import axios from "axios";

import { rootApi } from "../../constants";

const EditUser = ({ match }) => {
  const [name, setName] = useState("");
  const userId = match.params.id;

  useEffect(() => {
    axios.get(`${rootApi}/users/${userId}`).then(response => {
      setName(response.data.name);
    });
  }, []);

  const onChangeName = e => setName(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();

    const editedUser = { name };
    await axios
      .post(`${rootApi}/users/update/${userId}`, editedUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    window.location = "/users";
  };

  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={onChangeName}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
