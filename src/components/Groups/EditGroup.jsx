import React, { useEffect, useState } from "react";
import axios from "axios";

import { rootApi } from "../../constants";

const EditGroup = ({ match }) => {
  const [name, setName] = useState("");
  const groupId = match.params.id;

  useEffect(() => {
    axios.get(`${rootApi}/groups/${groupId}`).then(response => {
      setName(response.data.name);
    });
  }, []);

  const onChangeName = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const editedGroup = { name };
    axios
      .post(`${rootApi}/groups/update/${groupId}`, editedGroup)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    setName("");

    window.location = "/groups";
  };

  return (
    <div>
      <h3>Edit Group</h3>
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
          <input type="submit" value="Edit Group" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditGroup;
