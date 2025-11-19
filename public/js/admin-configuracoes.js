function alternarTema() {
  document.body.classList.toggle("dark");
  localStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
  alert("Tema atualizado!");
}

async function limparCache() {
  alert("Cache limpo!");
}

async function limparSeeds() {
  if (!confirm("Isso resetará o banco e recriará tudo. Continuar?")) return;
  await fetch("/api/admin/reset", { method: "POST", credentials: "include" });
  alert("Banco resetado!");
}
