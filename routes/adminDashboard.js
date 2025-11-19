const express = require("express");
const router = express.Router();
const pool = require("../db");
const { isAdmin } = require("./authMiddleware");

router.get("/metrics", isAdmin, async (req, res) => {
  const [[users]] = await pool.query("SELECT COUNT(*) AS total FROM users");
  const [[cursos]] = await pool.query("SELECT COUNT(*) AS total FROM cursos");
  const [[matriculas]] = await pool.query("SELECT COUNT(*) AS total FROM enrollments");
  const [[aulas]] = await pool.query("SELECT COUNT(*) AS total FROM aulas");

  res.json({
    usuarios: users.total,
    cursos: cursos.total,
    matriculas: matriculas.total,
    aulas: aulas.total
  });
});

module.exports = router;
