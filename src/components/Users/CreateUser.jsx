import React, { useState } from "react";
import axios from "axios";

import { rootApi } from "../../constants";

const CreateUser = () => {
  const [name, setName] = useState("");

  const onChangeName = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const newUser = { name };
    axios
      .post(`${rootApi}/users/add`, newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    setName("");

    window.location = "/users";
  };

  return (
    <div>
      <h3>Create New User</h3>
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
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
