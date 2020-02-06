import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    <div className="container">
      <Link to="/" className="navbar-brand">
        Planned
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Events
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/groups" className="nav-link">
              Groups
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
