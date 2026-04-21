const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const { isAuthenticated } = require('../middleware/authMiddleware');

// CREATE ORDER
router.post('/', isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const { items } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id) VALUES (?)',
      [user_id]
    );

    const order_id = orderResult.insertId;

    for (let item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, book_id, quantity) VALUES (?, ?, ?)',
        [order_id, item.book_id, item.quantity]
      );
    }

    await connection.commit();
    res.json({ message: 'Order placed' });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// GET MY ORDERS
router.get('/my-orders', isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;

  try {
    const [orders] = await db.query(`
      SELECT o.id, o.status, o.created_at,
             b.title, oi.quantity
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN books b ON oi.book_id = b.id
      WHERE o.user_id = ?
    `, [user_id]);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;