const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAuthenticated } = require("./authMiddleware");

// listar comentários da aula
router.get("/:aulaId", isAuthenticated, async (req, res) => {
  const { aulaId } = req.params;
  const [rows] = await pool.query(`
    SELECT c.id, c.mensagem, c.created_at, u.nome
    FROM comentarios c
    JOIN users u ON u.id = c.user_id
    WHERE c.aula_id = ?
    ORDER BY c.created_at DESC
  `, [aulaId]);
  res.json(rows);
});

// criar comentário
router.post("/:aulaId", isAuthenticated, async (req, res) => {
  const { aulaId } = req.params;
  const user_id = req.session.user.id;
  const { mensagem } = req.body;

  await pool.query(
    "INSERT INTO comentarios (user_id, aula_id, mensagem, created_at) VALUES (?, ?, ?, NOW())",
    [user_id, aulaId, mensagem]
  );

  res.json({ message: "Comentário enviado!" });
});

module.exports = router;
