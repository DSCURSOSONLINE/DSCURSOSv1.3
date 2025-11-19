document.addEventListener("DOMContentLoaded", async () => {

  // Verificar login
  const resp = await fetch("/api/auth/me", { credentials: "include" });
  if (!resp.ok) return location.href = "/login.html";

  const user = await resp.json();
  document.getElementById("alunoNome").innerText = `👋 Olá, ${user.nome}!`;

  carregarNotificacoes();
  carregarContinuar();
  carregarCursos();

  // botão logout
  document.getElementById("logoutBtn").onclick = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    location.href = "/login.html";
  };
});

// Notificações
async function carregarNotificacoes() {
  const resp = await fetch("/api/notifications/recent");
  const lista = document.getElementById("notificacoesLista");

  if (!resp.ok) {
    lista.innerHTML = "<p>Nenhum aviso no momento.</p>";
    return;
  }

  const notificacoes = await resp.json();

  if (notificacoes.length === 0) {
    lista.innerHTML = "<p>Nenhuma notificação por enquanto 🎉</p>";
    return;
  }

  lista.innerHTML = notificacoes.map(n => `
    <div class="list-item">
      <strong>${n.titulo}</strong>
      <p>${n.mensagem}</p>
      <span class="muted">${new Date(n.data).toLocaleDateString()}</span>
    </div>
  `).join("");
}

// Continuar assistindo
async function carregarContinuar() {
  const resp = await fetch("/api/enrollments/continue", { credentials:"include" });
  const box = document.getElementById("continuarBox");

  if (!resp.ok) {
    box.innerHTML = "<p>Você ainda não iniciou nenhuma aula.</p>";
    return;
  }

  const dados = await resp.json();
  if (dados.length === 0) {
    box.innerHTML = "<p>Nenhuma aula em andamento.</p>";
    return;
  }

  const a = dados[0];

  box.innerHTML = `
    <div class="continue-card">
      <h3>${a.curso_titulo}</h3>
      <p>Última aula: <strong>${a.aula_titulo}</strong></p>
      <a class="btn" href="/aula.html?id=${a.aula_id}">Continuar ▶</a>
    </div>
  `;
}

// Cursos matriculados
async function carregarCursos() {
  const resp = await fetch("/api/enrollments/mine", { credentials:"include" });
  const box = document.getElementById("meusCursos");

  const cursos = await resp.json();
  if (cursos.length === 0) {
    box.innerHTML = "<p>Você ainda não está matriculado em nenhum curso.</p>";
    return;
  }

  box.innerHTML = cursos.map(c => `
    <div class="card">
      <img src="${c.thumb}" class="thumb">
      <h3>${c.titulo}</h3>
      <p>${c.descricao.substring(0, 80)}...</p>
      <a class="btn" href="/curso.html?id=${c.id}">Acessar Curso</a>
    </div>
  `).join("");
}
