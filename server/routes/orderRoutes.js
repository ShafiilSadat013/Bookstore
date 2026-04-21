const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const { isAuthenticated } = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", isAuthenticated, async (req, res) => {
  console.log("🔥 ORDER API HIT");
  console.log("SESSION:", req.session);

  try {
    const user_id = req.session.user.id;

    const sql = "INSERT INTO orders (user_id, status) VALUES (?, ?)";

    console.log("SQL:", sql);
    console.log("VALUES:", [user_id, "pending"]);

    const [result] = await db.query(sql, [user_id, "pending"]);

    console.log("DB RESULT:", result);

    return res.json({
      message: "Order inserted successfully",
      orderId: result.insertId,
    });
  } catch (err) {
    console.log("❌ DB ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});
// GET MY ORDERS
router.get("/my-orders", isAuthenticated, async (req, res) => {
  console.log("SESSION USER:", req.session.user); // 🔥 debug

  const user_id = req.session.user.id;

  try {
    const [rows] = await db.query("SELECT * FROM orders WHERE user_id = ?", [
      user_id,
    ]);

    console.log("ORDERS FOUND:", rows); // 🔥 debug

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/cancel", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const user_id = req.session.user.id;

  try {
    await db.query(
      "UPDATE orders SET status = ? WHERE id = ? AND user_id = ?",
      ["cancelled", id, user_id],
    );

    res.json({ message: "Order cancelled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
