import React, { useEffect, useState } from "react";
import axios from "axios";

import { rootApi } from "../../constants";

const CreateEventByGroup = ({ match }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});

  const groupId = match.params.id;

  useEffect(() => {
    axios.get(`${rootApi}/users`).then(response => {
      setUsers(response.data);
    });

    axios.get(`${rootApi}/groups/${groupId}`).then(response => {
      setGroup(response.data);
    });
  }, []);

  const onChangeUser = e => {
    const userId = e.target.value;
    const selectedUser = users.filter(user => user.userId === userId)[0];
    setUser(selectedUser);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const newEvent = {
      userId: user.userId,
      userName: user.name,
      groupId,
      groupName: group.name
    };

    await axios
      .post(`${rootApi}/events/add`, newEvent)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    window.location = "/";
  };

  return (
    <div>
      <h3>Create New Event</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Group Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue={group.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>User Name</label>
          <select
            required
            className="form-control"
            defaultValue={""}
            onChange={onChangeUser}
          >
            <option value="">Choose User Name</option>
            {users.map(user => (
              <option key={user.userId} value={user.userId}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Event"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEventByGroup;
