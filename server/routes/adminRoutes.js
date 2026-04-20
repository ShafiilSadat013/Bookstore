const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const { isAdmin } = require('../middleware/authMiddleware');

router.use(isAdmin);

// View all users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View all orders
router.get('/orders', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT orders.*, users.name as user_name 
      FROM orders 
      JOIN users ON orders.user_id = users.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
