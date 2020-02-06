import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { rootApi } from "../../constants";

const Event = ({ event, deleteEvent }) => (
  <tr>
    <td>{event.userName}</td>
    <td>{event.groupName}</td>
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

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${rootApi}/events`).then(response => {
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
      <h3>Event List</h3>
      <Link className="btn btn-primary btn-lg my-2" to={`/create`}>
        Create New Event
      </Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>User Name</th>
            <th>Group Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{eventList()}</tbody>
      </table>
    </div>
  );
};

export default EventList;
