import React, { useState } from "react";
import { addEvent } from "../../services/api";
import "./add-event.css";

function AddEvent() {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addEvent(event);

    if (res?.id) {
      alert("Event added successfully");

      setEvent({
        title: "",
        date: "",
        location: "",
        description: "",
      });
    } else {
      alert("Failed to add event");
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <input name="title" placeholder="Title" value={event.title} onChange={handleChange} />
        <input name="date" type="date" value={event.date} onChange={handleChange} />
        <input name="location" placeholder="Location" value={event.location} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={event.description} onChange={handleChange} />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;