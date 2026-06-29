import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // =========================
  // LOAD SINGLE EVENT
  // =========================
  useEffect(() => {
    fetch(`http://localhost:3002/events`)
      .then((res) => res.json())
      .then((data) => {
        const event = data.find((e) => e.id === parseInt(id));

        if (event) {
          setTitle(event.title);
          setDate(event.date);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // =========================
  // UPDATE EVENT
  // =========================
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:3002/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            date,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Event Updated Successfully");

        // go back to list
        navigate("/event-list");
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Event</h2>

      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <button onClick={handleUpdate}>
        Update Event
      </button>
    </div>
  );
}

export default EditEvent;