const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const { isAuthenticated, isAdmin } = require("./authMiddleware");

/* ============================================================
   REGISTRO DE USUÁRIO
============================================================ */

router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    // Verificar se email já existe
    const [[existe]] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existe) {
      return res.status(400).json({ error: "Este email já está cadastrado." });
    }

    const hash = await bcrypt.hash(senha, 10);

    await pool.query(
      "INSERT INTO users (nome, email, senha, admin) VALUES (?, ?, ?, 0)",
      [nome, email, hash]
    );

    res.json({ message: "Usuário registrado com sucesso!" });

  } catch (err) {
    console.error("Erro ao registrar:", err);
    res.status(500).json({ error: "Erro interno ao registrar." });
  }
});

/* ============================================================
   LOGIN
============================================================ */

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [[user]] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      return res.status(400).json({ error: "Senha incorreta." });
    }

    // Salvar sessão
    req.session.user = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      admin: user.admin
    };

    res.json({
      message: "Logado com sucesso!",
      user: req.session.user
    });

  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ error: "Erro interno ao fazer login." });
  }
});

/* ============================================================
   /me -> Dados do usuário logado
============================================================ */

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autenticado." });
  }
  res.json(req.session.user);
});

/* ============================================================
   LOGOUT
============================================================ */

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout efetuado com sucesso." });
  });
});

/* ============================================================
   LISTAR USUÁRIOS (ADMIN)
============================================================ */

router.get("/users", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, nome, email, admin FROM users ORDER BY id DESC"
    );
    res.json(users);

  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ error: "Erro interno ao listar usuários." });
  }
});

/* ============================================================
   TORNAR ADMIN (ADMIN)
============================================================ */

router.put("/users/admin/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    await pool.query(
      "UPDATE users SET admin = 1 WHERE id = ?",
      [req.params.id]
    );

    res.json({ message: "Usuário agora é administrador." });

  } catch (err) {
    console.error("Erro ao tornar admin:", err);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

/* ============================================================
   REMOVER USUÁRIO (ADMIN)
============================================================ */

router.delete("/users/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "Usuário removido com sucesso." });

  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

module.exports = router;


