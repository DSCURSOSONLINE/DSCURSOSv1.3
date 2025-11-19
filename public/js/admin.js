document.addEventListener("DOMContentLoaded", async () => {
  const resp = await fetch("/api/auth/me", { credentials: "include" });

  if (!resp.ok) {
    alert("Você precisa estar logado como ADMIN.");
    return location.href = "/login.html";
  }

  const user = await resp.json();

  if (!user.admin) {
    alert("Acesso negado. Apenas administradores podem acessar.");
    return location.href = "/index.html";
  }

  // botão sair
  const logout = document.getElementById("logoutBtn");
  logout.onclick = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    location.href = "/login.html";
  };
});

document.querySelector(".sidebar-toggle")?.addEventListener("click", () => {
  document.querySelector(".admin-sidebar").classList.toggle("collapsed");
});

function abrirOverlay(pagina) {
  const overlay = document.getElementById("overlay");
  const frame = document.getElementById("overlayFrame");

  frame.src = "/" + pagina;
  overlay.classList.remove("hidden");
}

function fecharOverlay() {
  const overlay = document.getElementById("overlay");
  const frame = document.getElementById("overlayFrame");

  overlay.classList.add("hidden");

  // Opcional: limpa o frame
  frame.src = "";
}

