document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarios(); carregarNotificacoes();
  document.getElementById("formNotif").addEventListener("submit", enviar);
});

async function carregarUsuarios() {
  const sel = document.querySelector('select[name="user_id"]');
  const resp = await fetch('/api/auth/users', { credentials: "include" }).catch(() => null);
  if (!resp || resp.status !== 200) return;
  const users = await resp.json();
  users.forEach(u => {
    const opt = document.createElement("option");
    opt.value = u.id; opt.textContent = `${u.nome} (${u.email})`;
    sel.appendChild(opt);
  });
}

async function enviar(e) {
  e.preventDefault();
  const msg = document.getElementById("msgNotify");
  const fd = new FormData(e.target);
  const data = { titulo: fd.get('titulo'), mensagem: fd.get('mensagem') };
  const resp = await fetch("/api/notifications", {
    method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
    body: JSON.stringify(data)
  });
  const json = await resp.json();
  msg.textContent = json.message || json.error;
  msg.className = "alert " + (resp.ok ? "alert-success" : "alert-error");
  msg.style.display = "block";
  if (resp.ok) { e.target.reset(); carregarNotificacoes(); }
}

async function carregarNotificacoes() {
  const tbody = document.getElementById("listaNotifs");
  const resp = await fetch("/api/notifications/all", { credentials: "include" });
  const notifs = await resp.json();
  tbody.innerHTML = notifs.map(n => `
    <tr>
      <td>${n.id}</td><td>${n.titulo}</td><td>${n.mensagem}</td>
      <td>${new Date(n.data).toLocaleString()}</td>
      <td><button class="btn-small btn-danger" onclick="delNotif(${n.id})">Excluir</button></td>
    </tr>
  `).join("");
}
async function delNotif(id) {
  if (!confirm("Deseja apagar?")) return;
  await fetch(`/api/notifications/${id}`, { method:"DELETE", credentials:"include" });
  carregarNotificacoes();
}
