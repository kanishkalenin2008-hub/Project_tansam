import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./dashboard.css";

function Dashboard() {
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3002/events");
        const data = await res.json();

        setEventCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="dashboard">

      {/* HEADER */}
      <Header />

      <div className="dashboard-body">

        {/* SIDEBAR (ONLY THIS, NO INLINE SIDEBAR CODE) */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="dashboard-content">

          <div className="cards">

            <div className="card">
              <h2>Total Events</h2>
              <p>{eventCount}</p>
            </div>

            <div className="card">
              <h2>Completed Events</h2>
              <p>5</p>
            </div>

            <div className="card">
              <h2>Registered Students</h2>
              <p>150</p>
            </div>

          </div>

          <div className="table-container">
            <h2>Quick Info</h2>

            <p>
              Welcome to the College Event Management System Dashboard.
              You can manage events, view event list, and track registrations here.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;