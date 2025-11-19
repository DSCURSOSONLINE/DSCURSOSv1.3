// login.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("Formulário de login não encontrado!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, senha })
    });

    const data = await resp.json();

    if (!resp.ok) {
      alert(data.error || "Erro ao fazer login.");
      return;
    }

    // ===========================
    // REDIRECIONAMENTO POR TIPO
    // ===========================
    if (data.user.admin === 1) {
      location.href = "/admin.html"; // painel admin
    } else {
      location.href = "/home.html"; // home do aluno
    }
  });
});

// Se já estiver logado:
(async () => {
  const resp = await fetch("/api/auth/me", { credentials: "include" });

  if (resp.ok) {
    const user = await resp.json();

    if (user.admin === 1) {
      location.href = "/admin.html";
    } else {
      location.href = "/home.html";
    }
  }
})();
