const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/* ======================
   MYSQL CONNECTION
====================== */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kanishka@lenin_562008",
  database: "project"
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed ❌", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

/* ======================
   LOGIN API
====================== */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        email,
        role: "admin"
      }
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

/* ======================
   ADD EVENT
====================== */
app.post("/events", (req, res) => {
  const { title, date } = req.body;

  const sql =
    "INSERT INTO events (title, event_date) VALUES (?, ?)";

  db.query(sql, [title, date], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      message: "Event added successfully",
      id: result.insertId
    });
  });
});

/* ======================
   GET ALL EVENTS
====================== */
app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    const formatted = results.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.event_date
    }));

    res.json(formatted);
  });
});

/* ======================
   GET SINGLE EVENT
====================== */
app.get("/events/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM events WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      event: {
        id: results[0].id,
        title: results[0].title,
        date: results[0].event_date
      }
    });
  });
});

/* ======================
   UPDATE EVENT
====================== */
app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;

  const sql =
    "UPDATE events SET title = ?, event_date = ? WHERE id = ?";

  db.query(sql, [title, date, id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      message: "Event updated successfully"
    });
  });
});

/* ======================
   DELETE EVENT
====================== */
app.delete("/events/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM events WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully"
    });
  });
});

/* ======================
   START SERVER
====================== */
app.listen(3002, () => {
  console.log("Server Running On Port 3002 🚀");
});