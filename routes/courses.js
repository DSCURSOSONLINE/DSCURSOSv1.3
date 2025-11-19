const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAdmin } = require("./authMiddleware");

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM cursos ORDER BY id DESC");
  res.json(rows);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [[curso]] = await pool.query("SELECT * FROM cursos WHERE id = ?", [id]);
  if (!curso) return res.status(404).json({ error: "Curso não encontrado" });
  res.json(curso);
});

// CRUD Admin
router.post("/", isAdmin, async (req, res) => {
  const { titulo, descricao, categoria, thumb } = req.body;
  await pool.query(
    "INSERT INTO cursos (titulo, descricao, categoria, thumb) VALUES (?, ?, ?, ?)",
    [titulo, descricao, categoria, thumb]
  );
  res.json({ message: "Curso criado" });
});

router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, categoria, thumb } = req.body;
  await pool.query(
    "UPDATE cursos SET titulo=?, descricao=?, categoria=?, thumb=? WHERE id=?",
    [titulo, descricao, categoria, thumb, id]
  );
  res.json({ message: "Curso atualizado" });
});

router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM cursos WHERE id = ?", [id]);
  res.json({ message: "Curso removido" });
});

module.exports = router;
