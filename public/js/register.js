// register.js

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmar = document.getElementById("confirmarSenha").value.trim();

    if (!nome || !email || !senha || !confirmar) {
      alert("Preencha todos os campos.");
      return;
    }

    // ⚠️ VERIFICAÇÃO DE SENHA
    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    // Enviar para API
    const resp = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await resp.json();

    if (!resp.ok) {
      alert(data.error || "Erro ao registrar.");
      return;
    }

    alert("Conta criada com sucesso!");
    location.href = "/login.html";
  });

});
