const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authMiddleware");

// ensure cart exists
function getCart(req) {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  return req.session.cart;
}

// ADD TO CART
router.post("/add", isAuthenticated, (req, res) => {
  const { book_id, title, image } = req.body;

  const cart = getCart(req);

  const existing = cart.find((item) => item.book_id === book_id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ book_id, title, image, quantity: 1 });
  }

  res.json(cart);
});

// GET CART
router.get("/", isAuthenticated, (req, res) => {
  res.json(getCart(req));
});

// REMOVE ITEM
router.delete("/:book_id", isAuthenticated, (req, res) => {
  req.session.cart = getCart(req).filter(
    (item) => item.book_id != req.params.book_id,
  );

  res.json(req.session.cart);
});

module.exports = router;
