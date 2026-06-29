
import React from "react";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <h2>College Event Management System</h2>

      <div className="header-right">
        <span>Welcome, Student 👋</span>
        <button onClick={() => alert("Logged out!")}>Logout</button>
      </div>
    </div>
  );
}

export default Header;