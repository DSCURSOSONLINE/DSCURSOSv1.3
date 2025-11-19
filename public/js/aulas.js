async function isLogged() {
  try {
    const resp = await fetch("/api/auth/me", { credentials:"include" });
    if (!resp.ok) return false;
    const user = await resp.json();
    return user && user.id ? true : false;
  } catch { return false; }
}

document.addEventListener("DOMContentLoaded", () => { carregarCursos(); });

async function carregarCursos() {
  const lista = document.getElementById("listaCursos");
  lista.innerHTML = "<p>Carregando cursos...</p>";

  const logged = await isLogged();
  const resp = await fetch("/api/courses");
  const cursos = await resp.json();

  if (!cursos.length) {
    lista.innerHTML = "<p class='muted'>Nenhum curso cadastrado.</p>";
    return;
  }

  lista.innerHTML = "";
  cursos.forEach(curso => {
    lista.innerHTML += `
      <article class="card aula-card">
        <h3>${curso.titulo}</h3>
        <span class="badge-categoria">${curso.categoria || ""}</span>
        <p class="aula-descricao">${curso.descricao || ""}</p>
        ${ logged
          ? `<a href="/curso.html?id=${curso.id}" class="btn-primary" style="margin-top:8px;">Acessar curso</a>`
          : `<a href="/login.html" class="btn-outline" style="margin-top:8px;">Entrar para assistir</a>`
        }
      </article>
    `;
  });
}
