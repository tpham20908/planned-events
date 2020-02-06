import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import EventList from "./components/Events/EventList";
import CreateEvent from "./components/Events/CreateEvent";
import EditEvent from "./components/Events/EditEvent";
import UserList from "./components/Users/UserList";
import CreateUser from "./components/Users/CreateUser";
import EditUser from "./components/Users/EditUser";
import GroupList from "./components/Groups/GroupList";
import CreateGroup from "./components/Groups/CreateGroup";
import EditGroup from "./components/Groups/EditGroup";

const App = () => (
  <Router>
    <Navbar />
    <br />
    <div className="container">
      <Route path="/" exact component={EventList} />
      <Route path="/create" component={CreateEvent} />
      <Route path="/edit/:id" component={EditEvent} />
      <Route path="/users" component={UserList} />
      <Route path="/user/create" component={CreateUser} />
      <Route path="/user/edit/:id" component={EditUser} />
      <Route path="/groups" component={GroupList} />
      <Route path="/group/create" component={CreateGroup} />
      <Route path="/group/edit/:id" component={EditGroup} />
    </div>
  </Router>
);

export default App;
