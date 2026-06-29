import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Event System</h2>

      <nav className="sidebar-menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-event">Add Event</Link>
        <Link to="/event-list">Event List</Link>
        <Link to="/register">Users</Link>
      </nav>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;