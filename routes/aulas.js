const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAuthenticated, isAdmin } = require("./authMiddleware");

// aula específica (protegida)
router.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const [[aula]] = await pool.query(`
    SELECT a.*, m.curso_id 
    FROM aulas a
    JOIN modulos m ON m.id = a.modulo_id
    WHERE a.id = ?
  `, [id]);

  if (!aula) return res.status(404).json({ error: "Aula não encontrada" });
  res.json(aula);
});

// aulas por módulo
router.get("/modulo/:moduloId", async (req, res) => {
  const { moduloId } = req.params;
  const [rows] = await pool.query(
    "SELECT * FROM aulas WHERE modulo_id = ? ORDER BY id ASC",
    [moduloId]
  );
  res.json(rows);
});

// CRUD admin
router.post("/", isAdmin, async (req, res) => {
  const { modulo_id, titulo, descricao, url_video } = req.body;
  await pool.query(
    "INSERT INTO aulas (modulo_id, titulo, descricao, url_video) VALUES (?, ?, ?, ?)",
    [modulo_id, titulo, descricao, url_video]
  );
  res.json({ message: "Aula criada" });
});

router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, url_video } = req.body;
  await pool.query(
    "UPDATE aulas SET titulo=?, descricao=?, url_video=? WHERE id=?",
    [titulo, descricao, url_video, id]
  );
  res.json({ message: "Aula atualizada" });
});

router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM aulas WHERE id=?", [id]);
  res.json({ message: "Aula removida" });
});

module.exports = router;
