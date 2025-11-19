async function verificarLogin() {
  try {
    const resp = await fetch("/api/auth/me", { credentials: "include" });
    if (!resp.ok) return false;
    const user = await resp.json();
    return user && user.id ? true : false;
  } catch { return false; }
}

async function carregarAula(aulaId) {
  const resp = await fetch(`/api/aulas/${aulaId}`, { credentials: "include" });
  if (resp.status === 401) { alert("Você precisa estar logado para assistir às aulas."); location.href = "/login.html"; return; }
  const aula = await resp.json();
  document.getElementById("aulaTitulo").textContent = aula.titulo;
  document.getElementById("aulaDescricao").textContent = aula.descricao || "";
  document.getElementById("aulaVideo").src = aula.url_video;
  carregarSidebar(aula.modulo_id);
  carregarComentarios(aulaId);
}

async function carregarSidebar(moduloId) {
  const resp = await fetch(`/api/aulas/modulo/${moduloId}`, { credentials: "include" });
  const aulas = await resp.json();
  const lista = document.getElementById("listaAulas");
  lista.innerHTML = "";
  aulas.forEach(a => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="/aula.html?id=${a.id}">${a.titulo}</a>`;
    lista.appendChild(li);
  });
}

async function carregarComentarios(aulaId) {
  const box = document.getElementById("comentariosBox");
  try {
    const resp = await fetch(`/api/comentarios/${aulaId}`, { credentials:"include" });
    if (!resp.ok) { box.innerHTML = "<p class='muted'>Erro ao carregar comentários.</p>"; return; }
    const comentarios = await resp.json();
    if (!comentarios.length) { box.innerHTML = "<p class='muted'>Nenhum comentário ainda.</p>"; return; }
    box.innerHTML = comentarios.map(c => `
      <div class="card" style="margin-bottom:8px;">
        <strong>${c.nome}</strong>
        <p>${c.mensagem}</p>
      </div>
    `).join("");
  } catch { box.innerHTML = "<p class='muted'>Erro ao carregar comentários.</p>"; }
}

async function registrarInicio(aulaId) {
  try {
    await fetch("/api/estatisticas/inicio", {
      method: "POST", headers: {"Content-Type":"application/json"}, credentials:"include",
      body: JSON.stringify({ aula_id: aulaId })
    });
  } catch {}
}

window.addEventListener("beforeunload", () => {
  fetch("/api/estatisticas/fim", { method:"POST", credentials:"include" });
});

document.addEventListener("DOMContentLoaded", async () => {
  const logado = await verificarLogin();
  if (!logado) { alert("Faça login para acessar as aulas."); location.href = "/login.html"; return; }
  const params = new URLSearchParams(location.search);
  const aulaId = params.get("id");
  if (!aulaId) { alert("Aula não encontrada."); location.href = "/aulas.html"; return; }
  await carregarAula(aulaId);
  registrarInicio(aulaId);
});
