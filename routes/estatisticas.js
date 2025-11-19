const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAuthenticated } = require("./authMiddleware");

router.post("/inicio", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const { aula_id } = req.body;
  await pool.query(
    "INSERT INTO aula_tempo (user_id, aula_id, inicio) VALUES (?, ?, NOW())",
    [user_id, aula_id]
  );
  res.json({ ok: true });
});

router.post("/fim", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  await pool.query("UPDATE aula_tempo SET fim = NOW() WHERE user_id=? AND fim IS NULL", [user_id]);
  res.json({ ok: true });
});

router.get("/geral", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;

  const [[aulas]] = await pool.query(
    "SELECT COUNT(*) AS aulasConcluidas FROM aula_concluida WHERE user_id = ?",
    [user_id]
  );
  const [[tempo]] = await pool.query(
    "SELECT SUM(TIMESTAMPDIFF(SECOND, inicio, fim)) AS tempoTotal FROM aula_tempo WHERE user_id = ?",
    [user_id]
  );
  const [ultimas] = await pool.query(`
    SELECT a.titulo, c.titulo AS curso
    FROM aula_concluida ac
    JOIN aulas a ON a.id = ac.aula_id
    JOIN modulos m ON m.id = a.modulo_id
    JOIN cursos c ON c.id = m.curso_id
    WHERE ac.user_id = ?
    ORDER BY ac.data DESC
    LIMIT 5
  `, [user_id]);

  res.json({
    aulasConcluidas: aulas.aulasConcluídas || aulas.aulasConcluidas || 0,
    tempoTotal: tempo.tempoTotal || 0,
    ultimasAulas: ultimas
  });
});

module.exports = router;
