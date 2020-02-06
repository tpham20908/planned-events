import React, { useEffect, useState } from "react";
import axios from "axios";

import { rootApi } from "../../constants";

const CreateEvent = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});

  useEffect(() => {
    axios.get(`${rootApi}/users`).then(response => {
      setUsers(response.data);
    });

    axios.get(`${rootApi}/groups`).then(response => {
      setGroups(response.data);
    });
  }, []);

  const onChangeUser = e => {
    const userId = e.target.value;
    const selectedUser = users.filter(user => user.userId === userId)[0];
    setUser(selectedUser);
  };

  const onChangeGroup = e => {
    const groupId = e.target.value;
    const selectedGroup = groups.filter(group => group.groupId === groupId)[0];
    setGroup(selectedGroup);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newEvent = {
      userId: user.userId,
      userName: user.name,
      groupId: group.groupId,
      groupName: group.name
    };

    axios
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
          <label>Group Name</label>
          <select
            required
            className="form-control"
            defaultValue={""}
            onChange={onChangeGroup}
          >
            <option value="">Choose Group Name</option>
            {groups.map(group => (
              <option key={group.groupId} value={group.groupId}>
                {group.name}
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

export default CreateEvent;
