const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAuthenticated, isAdmin } = require("./authMiddleware");

// criar notificação (admin)
router.post("/", isAdmin, async (req, res) => {
  const { titulo, mensagem } = req.body;
  await pool.query(
    "INSERT INTO notificacoes (titulo, mensagem, data) VALUES (?, ?, NOW())",
    [titulo, mensagem]
  );
  res.json({ message: "Notificação criada" });
});

// listar todas (admin)
router.get("/all", isAdmin, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM notificacoes ORDER BY data DESC");
  res.json(rows);
});

// últimas notificações para usuário (polling simples)
router.get("/recent", isAuthenticated, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM notificacoes ORDER BY data DESC LIMIT 5");
  res.json(rows);
});

// excluir notificação (admin)
router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM notificacoes WHERE id = ?", [id]);
  res.json({ message: "Notificação removida" });
});

module.exports = router;
