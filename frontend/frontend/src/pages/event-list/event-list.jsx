import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./event-list.css";

function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:3002/events");
      const data = await res.json();

      console.log("EVENTS:", data);
      setEvents(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3002/events/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Event Deleted Successfully");
        fetchEvents();
      } else {
        alert("Delete Failed");
      }
    } catch (error) {
      console.log("Delete Error:", error);
      alert("Server Error");
    }
  };

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

              <p>
                <b>Date:</b> {event.date}
              </p>

              <div className="btn-group">
                <button
                  onClick={() =>
                    navigate(`/edit-event/${event.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventList;