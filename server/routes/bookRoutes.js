const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// Get all books
router.get('/', async (req, res) => {
  try {
    const [books] = await db.query('SELECT * FROM books');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const [books] = await db.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    res.json(books[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;