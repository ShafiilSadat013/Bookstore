const express = require("express");
const router = express.Router();
const { db } = require("../config/db");

// Get all books
router.get("/", async (req, res) => {
  const [books] = await db.query("SELECT * FROM books");
  res.json(books);
});
// Get single book
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
