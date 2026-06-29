const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   LOGIN API (still simple)
========================= */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      message: "Login successful",
      user: {
        email,
        role: "superadmin"
      }
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

/* =========================
   ADD EVENT (FIXED INSERT)
========================= */
app.post("/events", (req, res) => {
  const { title, date, location, description } = req.body;

  console.log("Received event:", req.body);

  const sql = `
    INSERT INTO events (title, event_date, venue)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [title || "", date || "", location || ""], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({
      message: "Event saved successfully",
      eventId: result.insertId
    });
  });
});

/* =========================
   GET EVENTS (FROM MYSQL)
========================= */
app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

/* =========================
   START SERVER
========================= */
app.listen(3002, () => {
  console.log("Server Running On Port 3002");
});