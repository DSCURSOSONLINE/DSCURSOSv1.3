document.addEventListener("DOMContentLoaded", async () => {
  const resp = await fetch("/api/admin/metrics", { credentials: "include" });
  if (!resp.ok) { alert("Acesso restrito ao admin."); return; }
  const stats = await resp.json();

  document.getElementById("totalUsuarios").textContent = stats.usuarios;
  document.getElementById("totalCursos").textContent = stats.cursos;
  document.getElementById("totalMatriculas").textContent = stats.matriculas;
  document.getElementById("totalAulas").textContent = stats.aulas;

  const ctx = document.getElementById("chartMatriculas");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Usuários", "Cursos", "Matrículas", "Aulas"],
      datasets: [{ label: "Totais", data: [stats.usuarios, stats.cursos, stats.matriculas, stats.aulas] }]
    }
  });
});
