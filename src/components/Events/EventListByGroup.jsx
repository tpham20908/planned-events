import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { rootApi } from "../../constants";

const Event = ({ event, deleteEvent }) => (
  <tr>
    <td>{event.groupName}</td>
    <td>{event.userName}</td>
    <td>
      <Link to={`edit/${event.eventId}`}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          deleteEvent(event.eventId);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

const EventListByGroup = ({ match }) => {
  const [events, setEvents] = useState([]);

  const groupId = match.params.id;

  useEffect(() => {
    axios.get(`${rootApi}/events/group/${groupId}`).then(response => {
      setEvents(response.data);
    });
  }, []);

  const eventList = () =>
    events.map(currentEvent => (
      <Event
        event={currentEvent}
        deleteEvent={deleteEvent}
        key={currentEvent.eventId}
      />
    ));

  const deleteEvent = eventId => {
    axios
      .delete(`${rootApi}/events/${eventId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));

    const newEvents = events.filter(event => event.eventId !== eventId);
    setEvents(newEvents);
  };

  return (
    <div>
      <h3>
        Event List By {events.length ? events[0].groupName : "This Group"}
      </h3>
      <Link
        className="btn btn-primary btn-lg my-2"
        to={`/createbygroup/${groupId}`}
      >
        Add User
      </Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Group Name</th>
            <th>User Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{eventList()}</tbody>
      </table>
    </div>
  );
};

export default EventListByGroup;
