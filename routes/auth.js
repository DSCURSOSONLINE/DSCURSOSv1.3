const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const { isAdmin } = require("./authMiddleware");

router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  await pool.query(
    "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, hash]
  );
  res.json({ message: "Usuário registrado com sucesso!" });
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const ok = await bcrypt.compare(senha, user.senha);
  if (!ok) return res.status(400).json({ error: "Senha incorreta" });

  req.session.user = { id: user.id, nome: user.nome, email: user.email, admin: user.admin };
  res.json({ message: "Logado!", user: req.session.user });
});

router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Não autenticado" });
  res.json(req.session.user);
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logout efetuado" }));
});

// listar usuários (admin) — usado no painel de notificações
router.get("/users", isAdmin, async (req, res) => {
  const [users] = await pool.query("SELECT id, nome, email FROM users ORDER BY nome ASC");
  res.json(users);
});

module.exports = router;
