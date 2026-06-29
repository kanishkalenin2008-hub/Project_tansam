const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3002;

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   MYSQL CONNECTION
======================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kanishka@lenin_562008", //ange this
  database: "project"
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed ❌", err);
  } else {
    console.log("DB Connected Successfully ✅");
  }
});

/* =======================
   LOGIN API
======================= */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({ success: true, user });
  });
});

/* =======================
   EVENTS - GET ALL
======================= */
app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "DB Error" });
    }

    res.json(results);
  });
});

/* =======================
   EVENTS - CREATE
======================= */
app.post("/events", (req, res) => {
  const { title, event_date } = req.body;

  const sql = "INSERT INTO events (title, event_date) VALUES (?, ?)";

  db.query(sql, [title, event_date], (err) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    res.json({ success: true });
  });
});

/* =======================
   EVENTS - UPDATE
======================= */
app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const { title, event_date } = req.body;

  const sql = "UPDATE events SET title = ?, event_date = ? WHERE id = ?";

  db.query(sql, [title, event_date, id], (err) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    res.json({ success: true });
  });
});

/* =======================
   EVENTS - DELETE
======================= */
app.delete("/events/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM events WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    res.json({ success: true });
  });
});

/* =======================
   USERS API
======================= */
app.get("/users", (req, res) => {
  const sql = "SELECT id, name, email FROM users";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "DB Error" });
    }

    res.json(results);
  });
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT} 🚀`);
});