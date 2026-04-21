const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { db } = require("../config/db");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // First user is admin for convenience
    const [users] = await db.query("SELECT COUNT(*) as count FROM users");
    const role = users[0].count === 0 ? "admin" : "user";

    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const bcrypt = require("bcrypt");
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 THIS IS CRITICAL (SESSION CREATION)
    req.session.user = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    res.json({
      message: "Login successful",
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// Get current user session
router.get("/me", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

module.exports = router;
