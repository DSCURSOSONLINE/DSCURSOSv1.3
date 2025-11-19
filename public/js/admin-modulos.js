document.addEventListener('DOMContentLoaded', async () => {
  await carregarCursos();
  document.getElementById('selectCurso').addEventListener('change', carregarModulos);
  document.getElementById('formModulo').addEventListener('submit', salvarModulo);
  document.getElementById('novoModulo').addEventListener('click', () => {
    const f = document.getElementById('formModulo');
    f.id.value = ''; f.titulo.value = '';
  });
  carregarModulos();
});

async function carregarCursos() {
  const resp = await fetch('/api/courses', { credentials: 'include' });
  const cursos = await resp.json();
  const sel = document.getElementById('selectCurso');
  sel.innerHTML = '';
  cursos.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = c.titulo;
    sel.appendChild(opt);
  });
}

async function carregarModulos() {
  const cursoId = document.getElementById('selectCurso').value;
  if (!cursoId) return;
  const resp = await fetch(`/api/modulos/${cursoId}`);
  const modulos = await resp.json();
  const container = document.getElementById('listaModulos');
  container.innerHTML = '';

  for (const m of modulos) {
    const box = document.createElement('div');
    box.className = 'form-card';
    box.innerHTML = `
      <h3>Módulo: ${m.titulo}</h3>
      <button class="btn-small" data-edit-modulo="${m.id}">Editar</button>
      <button class="btn-small btn-danger" data-del-modulo="${m.id}">Excluir</button>
      <h4 class="mt-2">Aulas</h4>
      <div data-aulas-modulo="${m.id}">Carregando aulas...</div>
      <h4 class="mt-2">Nova aula</h4>
      <form data-form-aula="${m.id}">
        <label>Título<input type="text" name="titulo" required></label>
        <label>Descrição<input type="text" name="descricao"></label>
        <label>URL do vídeo<input type="url" name="url_video" required></label>
        <button class="btn-small" type="submit">Adicionar aula</button>
      </form>
    `;
    container.appendChild(box);
    carregarAulasDoModulo(m.id);
  }

  container.addEventListener('click', async (e) => {
    if (e.target.dataset.editModulo) {
      const id = e.target.dataset.editModulo;
      const modulo = modulos.find(mm => mm.id == id);
      const f = document.getElementById('formModulo');
      f.id.value = modulo.id; f.titulo.value = modulo.titulo; window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (e.target.dataset.delModulo) {
      const id = e.target.dataset.delModulo;
      if (confirm('Excluir módulo e suas aulas?')) {
        await fetch(`/api/modulos/${id}`, { method: 'DELETE', credentials: 'include' });
        carregarModulos();
      }
    }
  });

  container.addEventListener('submit', async (e) => {
    if (e.target.matches('form[data-form-aula]')) {
      e.preventDefault();
      const moduloId = e.target.getAttribute('data-form-aula');
      const data = {
        modulo_id: moduloId,
        titulo: e.target.titulo.value,
        descricao: e.target.descricao.value,
        url_video: e.target.url_video.value
      };
      await fetch('/api/aulas', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify(data)
      });
      e.target.reset();
      carregarAulasDoModulo(moduloId);
    }
  });
}

async function carregarAulasDoModulo(moduloId) {
  const box = document.querySelector(`[data-aulas-modulo="${moduloId}"]`);
  const resp = await fetch(`/api/aulas/modulo/${moduloId}`);
  const aulas = await resp.json();
  if (!aulas.length) { box.innerHTML = '<p class="muted">Nenhuma aula.</p>'; return; }
  const ul = document.createElement('ul');
  aulas.forEach(a => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${a.titulo}</strong>
      <button class="btn-small btn-danger" data-del-aula="${a.id}" style="margin-left:.5rem;">Excluir</button>`;
    ul.appendChild(li);
  });
  box.innerHTML = ''; box.appendChild(ul);
  box.addEventListener('click', async (e) => {
    if (e.target.dataset.delAula) {
      const id = e.target.dataset.delAula;
      if (confirm('Excluir aula?')) {
        await fetch(`/api/aulas/${id}`, { method: 'DELETE', credentials: 'include' });
        carregarAulasDoModulo(moduloId);
      }
    }
  }, { once: true });
}

async function salvarModulo(e) {
  e.preventDefault();
  const cursoId = document.getElementById('selectCurso').value;
  const form = e.target;
  const data = { curso_id: cursoId, titulo: form.titulo.value };
  const id = form.id.value;
  let url = '/api/modulos'; let method = 'POST';
  if (id) { url += `/${id}`; method = 'PUT'; delete data.curso_id; }
  await fetch(url, {
    method, headers: { 'Content-Type': 'application/json' }, credentials: 'include',
    body: JSON.stringify(data)
  });
  form.reset(); form.id.value = ''; carregarModulos();
}
