const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const q = "%" + (req.query.q || "") + "%";

  const [cursos] = await pool.query(
    "SELECT id, titulo, descricao, categoria FROM cursos WHERE titulo LIKE ? OR descricao LIKE ? LIMIT 20",
    [q, q]
  );

  const [modulos] = await pool.query(
    `SELECT m.id, m.titulo, m.curso_id, c.titulo AS curso_titulo 
     FROM modulos m JOIN cursos c ON c.id = m.curso_id 
     WHERE m.titulo LIKE ? LIMIT 20`,
    [q]
  );

  const [aulas] = await pool.query(
    `SELECT a.id, a.titulo, a.descricao, m.curso_id, c.titulo AS curso_titulo
     FROM aulas a 
     JOIN modulos m ON m.id = a.modulo_id
     JOIN cursos c ON c.id = m.curso_id
     WHERE a.titulo LIKE ? OR a.descricao LIKE ?
     LIMIT 20`,
    [q, q]
  );

  res.json({ cursos, modulos, aulas });
});

module.exports = router;
