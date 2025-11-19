const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAdmin } = require("./authMiddleware");

router.get("/:cursoId", async (req, res) => {
  const { cursoId } = req.params;
  const [rows] = await pool.query(
    "SELECT * FROM modulos WHERE curso_id = ? ORDER BY id ASC",
    [cursoId]
  );
  res.json(rows);
});

// CRUD admin
router.post("/", isAdmin, async (req, res) => {
  const { curso_id, titulo } = req.body;
  await pool.query("INSERT INTO modulos (curso_id, titulo) VALUES (?, ?)", [curso_id, titulo]);
  res.json({ message: "Módulo criado" });
});

router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  await pool.query("UPDATE modulos SET titulo=? WHERE id=?", [titulo, id]);
  res.json({ message: "Módulo atualizado" });
});

router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM modulos WHERE id=?", [id]);
  res.json({ message: "Módulo removido" });
});

module.exports = router;
