import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/api";
import "./event-list.css";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };

    loadEvents();
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
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventList;