async function verificarLogin() {
  try {
    const resp = await fetch("/api/auth/me", { credentials: "include" });
    if (!resp.ok) return false;
    const user = await resp.json();
    return user && user.id ? user : false;
  } catch { return false; }
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = await verificarLogin();
  if (!user) { alert("Você precisa estar logado para acessar os cursos."); location.href = "/login.html"; return; }

  const params = new URLSearchParams(location.search);
  const cursoId = params.get("id");
  if (!cursoId) { alert("Curso não encontrado."); location.href = "/aulas.html"; return; }

  carregarCurso(cursoId);
  carregarModulos(cursoId);
  verificarMatricula(cursoId);
  carregarProgresso(cursoId);
});

async function carregarCurso(id) {
  const resp = await fetch(`/api/courses/${id}`);
  const curso = await resp.json();
  document.getElementById("cursoTitulo").textContent = curso.titulo;
  document.getElementById("cursoDescricao").textContent = curso.descricao || "";
  document.getElementById("cursoCategoria").textContent = curso.categoria || "";
  document.getElementById("cursoThumb").src = curso.thumb || "/img/default-course.png";
}

async function carregarModulos(cursoId) {
  const resp = await fetch(`/api/modulos/${cursoId}`);
  const modulos = await resp.json();
  const box = document.getElementById("listaModulos");
  box.innerHTML = "";
  for (const modulo of modulos) {
    const div = document.createElement("div");
    div.className = "modulo-bloco";
    div.innerHTML = `<h3>${modulo.titulo}</h3><ul id="mod-${modulo.id}" class="lista-aulas"></ul>`;
    box.appendChild(div);
    const respA = await fetch(`/api/aulas/modulo/${modulo.id}`);
    const aulas = await respA.json();
    const list = document.getElementById(`mod-${modulo.id}`);
    aulas.forEach(aula => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="/aula.html?id=${aula.id}">📘 ${aula.titulo}</a>`;
      list.appendChild(li);
    });
  }
}

async function verificarMatricula(cursoId) {
  const resp = await fetch(`/api/enrollments/check/${cursoId}`, { credentials: "include" });
  const json = await resp.json();
  const btnMatricular = document.getElementById("btnMatricular");
  const btnContinuar = document.getElementById("btnContinuar");

  if (json.matriculado) {
    btnMatricular.textContent = "Matriculado ✔";
    btnMatricular.disabled = true;
    btnMatricular.classList.add("btn-outline");
    try {
      const respUltima = await fetch(`/api/enrollments/continue`, { credentials: "include" });
      const dados = await respUltima.json();
      if (dados.length > 0) {
        btnContinuar.style.display = "inline-flex";
        btnContinuar.onclick = () => location.href = `/aula.html?id=${dados[0].aula_id}`;
      }
    } catch {}
  } else {
    btnMatricular.onclick = () => matricular(cursoId);
  }
}

async function matricular(cursoId) {
  const resp = await fetch(`/api/enrollments/do/${cursoId}`, { method: "POST", credentials: "include" });
  const json = await resp.json();
  if (resp.ok) { alert("Matrícula realizada!"); location.reload(); }
  else { alert(json.error || "Erro ao matricular."); }
}

async function carregarProgresso(cursoId) {
  const resp = await fetch(`/api/enrollments/progress/${cursoId}`, { credentials: "include" });
  const data = await resp.json();
  const pct = data.progresso || 0;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressText").textContent = pct + "%";
}
