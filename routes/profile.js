const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAuthenticated } = require("./authMiddleware");

router.get("/", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const [[user]] = await pool.query(
    "SELECT id, nome, email, telefone, interesses, foto FROM users WHERE id = ?",
    [user_id]
  );
  res.json(user);
});

router.put("/extra", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const { telefone, interesses } = req.body;
  await pool.query(
    "UPDATE users SET telefone = ?, interesses = ? WHERE id = ?",
    [telefone, interesses, user_id]
  );
  res.json({ message: "Atualizado!" });
});

// mock de foto (substitua depois por upload real com multer)
router.post("/foto", isAuthenticated, async (req, res) => {
  res.json({ foto: "/img/user-default.png" });
});

module.exports = router;
