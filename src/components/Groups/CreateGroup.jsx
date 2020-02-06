import React, { useState } from "react";
import axios from "axios";

import { rootApi } from "../../constants";

const CreateGroup = () => {
  const [name, setName] = useState("");

  const onChangeName = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const newGroup = { name };
    axios
      .post(`${rootApi}/groups/add`, newGroup)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    setName("");

    window.location = "/groups";
  };

  return (
    <div>
      <h3>Create New Group</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Group Name: </label>
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
            value="Create Group"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
