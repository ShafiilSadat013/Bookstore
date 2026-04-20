const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Create order
router.post('/', isAuthenticated, async (req, res) => {
  const { book_id, title } = req.body;
  const user_id = req.session.user.id;
  try {
    await db.query('INSERT INTO orders (user_id, book_id, title) VALUES (?, ?, ?)', [user_id, book_id, title]);
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get my orders
router.get('/my-orders', isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  try {
    const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ?', [user_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel order
router.put('/:id/cancel', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const user_id = req.session.user.id;
  try {
    await db.query('UPDATE orders SET status = "cancelled" WHERE id = ? AND user_id = ?', [id, user_id]);
    res.json({ message: 'Order cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
