const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const { isAdmin } = require('../middleware/authMiddleware');

router.use(isAdmin);

// ADD BOOK
router.post('/books', async (req, res) => {
  const { title, author, price, stock } = req.body;

  try {
    await db.query(
      'INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)',
      [title, author, price, stock]
    );
    res.json({ message: 'Book added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BOOK
router.put('/books/:id', async (req, res) => {
  const { title, author, price, stock } = req.body;

  try {
    await db.query(
      'UPDATE books SET title=?, author=?, price=?, stock=? WHERE id=?',
      [title, author, price, stock, req.params.id]
    );
    res.json({ message: 'Book updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE BOOK
router.delete('/books/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM books WHERE id=?', [req.params.id]);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;