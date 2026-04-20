const express = require('express');
const router = express.Router();
const axios = require('axios');

// Proxy to Google Books API
router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Query parameter q is required' });
  
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}${apiKey ? `&key=${apiKey}` : ''}`;
    
    const response = await axios.get(url);
    const books = response.data.items ? response.data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail
    })) : [];
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
