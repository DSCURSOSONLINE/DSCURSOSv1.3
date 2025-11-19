const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const pool = require("../db");
const { isAuthenticated } = require("./authMiddleware");

router.get("/:cursoId", isAuthenticated, async (req, res) => {
  const user_id = req.session.user.id;
  const { cursoId } = req.params;

  const [[enr]] = await pool.query(
    "SELECT * FROM enrollments WHERE user_id=? AND curso_id=?",
    [user_id, cursoId]
  );
  if (!enr) return res.status(403).json({ error: "Você não está matriculado neste curso" });

  const [[curso]] = await pool.query("SELECT * FROM cursos WHERE id=?", [cursoId]);
  const [[user]] = await pool.query("SELECT * FROM users WHERE id=?", [user_id]);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=certificado_${cursoId}.pdf`);

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(res);

  doc.fontSize(26).text("Certificado de Conclusão", { align: "center" });
  doc.moveDown(2);
  doc.fontSize(16).text(`Certificamos que ${user.nome}`, { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`concluiu o curso "${curso.titulo}" na plataforma Cursos TI.`, { align: "center" });
  doc.moveDown(2);
  doc.fontSize(12).text("Data: " + new Date().toLocaleDateString("pt-BR"), { align: "center" });

  doc.end();
});

module.exports = router;
