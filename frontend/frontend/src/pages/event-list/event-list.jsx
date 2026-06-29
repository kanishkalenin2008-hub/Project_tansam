import React, { useEffect, useState } from "react";
import "./event-list.css";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("EVENTS FROM DB:", data); // 👈 important check
        setEvents(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="event-list-container">
      <h2>All Events</h2>

      <div className="event-grid">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event.id}>
              <h3>{event.title}</h3>
              <p><b>Date:</b> {event.date}</p>
              <p><b>Location:</b> {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventList;