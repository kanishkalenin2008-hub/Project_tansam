import React from "react";
import './dashboard.css';
function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Total Products</h3>
          <p>45</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>78</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;