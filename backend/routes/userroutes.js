const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  dashboard,
  getUsers,
  getAdmins,
  getDashboard,
  getRoles,
  addRole
} = require("../controller/userController");

// Middleware
const authMiddleware = require("../middleware/authmiddleware");

// =======================
// AUTH ROUTES
// =======================
router.post("/register", register);
router.post("/login", login);

// =======================
// DASHBOARD (PROTECTED)
// =======================
router.get("/dashboard", authMiddleware, dashboard);

// =======================
// USER MANAGEMENT ROUTES (optional admin features)
// =======================
router.get("/users", getUsers);
router.get("/admins", getAdmins);

// =======================
// ROLE MANAGEMENT ROUTES
// =======================
router.get("/roles", getRoles);
router.post("/role", addRole);

module.exports = router;