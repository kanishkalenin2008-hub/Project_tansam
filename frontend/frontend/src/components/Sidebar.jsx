import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>Event System</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-event">Add Event</Link>
        <Link to="/event-list">Event List</Link>
        <Link to="/register">Users</Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/login">Logout</Link>
      </div>

    </div>
  );
}

export default Sidebar;