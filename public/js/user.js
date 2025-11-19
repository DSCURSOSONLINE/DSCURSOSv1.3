async function getUser() {
  try {
    const resp = await fetch("/api/auth/me", { credentials: "include" });
    if (!resp.ok) return false;
    return await resp.json();
  } catch {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = await getUser();
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  carregarPerfil();
  carregarCursosMatriculados();
  carregarContinuarAulas();
  carregarEstatisticas();

  document.getElementById("btnSalvarExtra").onclick = salvarExtras;
  document.getElementById("btnFoto").onclick = enviarFoto;
});

async function carregarPerfil() {
  const resp = await fetch("/api/profile", { credentials: "include" });
  const user = await resp.json();

  document.getElementById("userNome").textContent = user.nome;
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userTelefone").value = user.telefone || "";
  document.getElementById("userInteresses").value = user.interesses || "";
  if (user.foto) document.getElementById("fotoPerfil").src = user.foto;
}

async function salvarExtras() {
  const data = {
    telefone: document.getElementById("userTelefone").value,
    interesses: document.getElementById("userInteresses").value,
  };
  await fetch("/api/profile/extra", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  alert("Informações atualizadas!");
}

async function enviarFoto() {
  const file = document.getElementById("fotoInput").files[0];
  if (!file) return alert("Selecione uma foto.");

  const form = new FormData();
  form.append("foto", file);
  const resp = await fetch("/api/profile/foto", {
    method: "POST",
    credentials: "include",
    body: form,
  });
  const json = await resp.json();
  document.getElementById("fotoPerfil").src = json.foto;
  alert("Foto atualizada!");
}

async function carregarCursosMatriculados() {
  const resp = await fetch("/api/enrollments/mine", { credentials: "include" });
  const cursos = await resp.json();
  const box = document.getElementById("listaCursos");

  if (!cursos.length) {
    box.innerHTML = "<p class='muted'>Você ainda não está matriculado em nenhum curso.</p>";
    return;
  }

  box.innerHTML = cursos.map(c => `
    <article class="card">
      <img src="${c.thumb || "/img/default-course.png"}"
        style="width:100%;border-radius:10px;margin-bottom:10px;">
      <h3>${c.titulo}</h3>
      <p class="muted">${c.categoria || ""}</p>
      <p>${c.descricao || ""}</p>
      <a href="/curso.html?id=${c.id}" class="btn-small" style="margin-top:10px;">Acessar curso</a>
    </article>
  `).join("");
}

async function carregarContinuarAulas() {
  const resp = await fetch("/api/enrollments/continue", { credentials:"include" });
  const aulas = await resp.json();
  const box = document.getElementById("continuarBox");
  if (!aulas.length) return;
  box.innerHTML = aulas.map(a => `
    <article class="card">
      <h3>${a.curso_titulo}</h3>
      <p>Aula: ${a.aula_titulo}</p>
      <a class="btn-small" href="/aula.html?id=${a.aula_id}">Continuar</a>
    </article>
  `).join("");
}

async function carregarEstatisticas() {
  try {
    const resp = await fetch("/api/estatisticas/geral", { credentials:"include" });
    const data = await resp.json();
    document.getElementById("statAulas").textContent = data.aulasConcluidas || 0;
    const horas = Math.floor((data.tempoTotal || 0) / 3600);
    const minutos = Math.floor(((data.tempoTotal || 0) % 3600) / 60);
    document.getElementById("statTempo").textContent = `${horas}h ${minutos}m`;

    document.getElementById("listaUltimas").innerHTML = (data.ultimasAulas || [])
      .map(a => `<li>${a.curso} — ${a.titulo}</li>`).join("");

    if (window.Chart) {
      new Chart(document.getElementById("chartTempo"), {
        type: "doughnut",
        data: {
          labels: ["Tempo estudado", "Referência 10h"],
          datasets: [{
            data: [data.tempoTotal || 0, Math.max(0, 36000 - (data.tempoTotal || 0))]
          }]
        }
      });
    }
  } catch {}
}
