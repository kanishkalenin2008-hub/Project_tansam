import React, { useState } from "react";
import "./add-event.css";

function AddEvent() {
  const [event, setEvent] = useState({
    title: "",
    date: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3002/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
      });

      const data = await res.json();

      console.log("EVENT ADDED:", data);

      if (res.ok) {
        alert("Event Added Successfully!");

        // reset form
        setEvent({
          title: "",
          date: "",
        });
      } else {
        alert("Failed to add event");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;