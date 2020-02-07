import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { rootApi } from "../../constants";

const Group = ({ group, deleteGroup }) => (
  <tr>
    <td>
      <Link to={`bygroup/${group.groupId}`}>{group.name}</Link>
    </td>
    <td>{group.createdAt.split("T")[0]}</td>
    <td>
      <Link to={`group/edit/${group.groupId}`}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          deleteGroup(group.groupId);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get(`${rootApi}/groups`).then(response => {
      setGroups(response.data);
    });
  }, []);

  const groupList = () =>
    groups.map(currentGroup => (
      <Group
        group={currentGroup}
        deleteGroup={deleteGroup}
        key={currentGroup.groupId}
      />
    ));

  const deleteGroup = groupId => {
    axios
      .delete(`${rootApi}/groups/${groupId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    const newGroups = groups.filter(group => group.groupId !== groupId);
    setGroups(newGroups);
  };

  return (
    <div>
      <h3>Group List</h3>
      <Link className="btn btn-primary btn-lg my-2" to={`group/create`}>
        Create New Group
      </Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Group Name</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{groupList()}</tbody>
      </table>
    </div>
  );
};

export default GroupList;
