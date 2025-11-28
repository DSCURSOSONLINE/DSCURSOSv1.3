document.addEventListener("DOMContentLoaded", async () => {
  carregarUsuarios();
});

async function carregarUsuarios() {
  const resp = await fetch("/api/auth/users", { credentials: "include" });
  const users = await resp.json();

  const tbody = document.getElementById("listaUsuarios");
  tbody.innerHTML = "";

  users.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.nome}</td>
        <td>${u.email}</td>
        <td>${u.admin ? "Sim" : "Não"}</td>
        <td>
          <button class="btn-small" onclick="tornarAdmin(${u.id})">Tornar Admin</button>
          <button class="btn-small btn-danger" onclick="deletarUsuario(${u.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

async function tornarAdmin(id) {
  if (!confirm("Tornar este usuário administrador?")) return;

  await fetch("/api/admin/users/admin/" + id, {
    method: "PUT",
    // credentials: "include"
  });

  carregarUsuarios();
}

async function deletarUsuario(id) {
  if (!confirm("Excluir usuário permanentemente?")) return;

  await fetch("/api/admin/users/" + id, {
    method: "DELETE",
    // credentials: "include"
  });

  carregarUsuarios();
}
