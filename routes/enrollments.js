const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAuthenticated } = require("./authMiddleware");

// matricular
router.post("/do/:cursoId", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const { cursoId } = req.params;
  await pool.query(
    "INSERT IGNORE INTO enrollments (user_id, curso_id) VALUES (?, ?)",
    [user_id, cursoId]
  );
  res.json({ message: "Matriculado com sucesso" });
});

// checar matrícula
router.get("/check/:cursoId", isAuthenticated, async (req, res) => {
  const { cursoId } = req.params;
  const user_id = req.session.user.id;
  const [[r]] = await pool.query(
    "SELECT * FROM enrollments WHERE user_id = ? AND curso_id = ?",
    [user_id, cursoId]
  );
  res.json({ matriculado: !!r });
});

// cursos do aluno
router.get("/mine", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const [rows] = await pool.query(`
    SELECT c.* FROM enrollments e
    JOIN cursos c ON c.id = e.curso_id
    WHERE e.user_id = ?
    ORDER BY e.data_matricula DESC
  `, [user_id]);
  res.json(rows);
});

// continuar aula
router.get("/continue", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const [rows] = await pool.query(`
    SELECT 
      a.id AS aula_id,
      a.titulo AS aula_titulo,
      c.titulo AS curso_titulo
    FROM aula_tempo t
    JOIN aulas a ON a.id = t.aula_id
    JOIN modulos m ON m.id = a.modulo_id
    JOIN cursos c ON c.id = m.curso_id
    WHERE t.user_id = ?
    ORDER BY t.inicio DESC
    LIMIT 1
  `, [user_id]);
  res.json(rows);
});

// progresso do curso
router.get("/progress/:cursoId", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const { cursoId } = req.params;

  const [[total]] = await pool.query(`
    SELECT COUNT(*) AS total FROM aulas a 
    JOIN modulos m ON m.id = a.modulo_id
    WHERE m.curso_id = ?
  `, [cursoId]);

  const [[feitas]] = await pool.query(`
    SELECT COUNT(*) AS feitas FROM aula_concluida ac
    JOIN aulas a ON a.id = ac.aula_id
    JOIN modulos m ON m.id = a.modulo_id
    WHERE ac.user_id = ? AND m.curso_id = ?
  `, [user_id, cursoId]);

  const pct = total.total > 0 ? Math.round(feitas.feitas / total.total * 100) : 0;
  res.json({ progresso: pct });
});

module.exports = router;
