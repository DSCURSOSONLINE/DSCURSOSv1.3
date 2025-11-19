document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formBusca').addEventListener('submit', buscar);
});

async function buscar(e) {
  e.preventDefault();
  const q = e.target.q.value.trim();
  if (!q) return;

  const resp = await fetch('/api/search?q=' + encodeURIComponent(q));
  const data = await resp.json();
  renderResultados(data);
}

function renderResultados({ cursos, modulos, aulas }) {
  const cBox = document.getElementById('resCursos');
  const mBox = document.getElementById('resModulos');
  const aBox = document.getElementById('resAulas');

  cBox.innerHTML = (cursos || []).map(c => `
    <article class="card">
      <h3>${c.titulo}</h3>
      <span class="badge-categoria">${c.categoria || ""}</span>
      <p>${c.descricao || ""}</p>
      <a href="/curso.html?id=${c.id}" class="btn-small">Ver curso</a>
    </article>
  `).join('') || '<p class="muted">Nenhum curso encontrado.</p>';

  mBox.innerHTML = (modulos || []).map(m => `
    <article class="card">
      <h3>${m.titulo}</h3>
      <p>Curso: ${m.curso_titulo}</p>
      <a href="/curso.html?id=${m.curso_id}" class="btn-small">Ir para curso</a>
    </article>
  `).join('') || '<p class="muted">Nenhum módulo encontrado.</p>';

  aBox.innerHTML = (aulas || []).map(a => `
    <article class="card">
      <h3>${a.titulo}</h3>
      <p>Curso: ${a.curso_titulo}</p>
      <p>${a.descricao || ""}</p>
      <a href="/aula.html?id=${a.id}" class="btn-small">Ver aula</a>
    </article>
  `).join('') || '<p class="muted">Nenhuma aula encontrada.</p>';
}
