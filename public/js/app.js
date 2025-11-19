document.addEventListener("DOMContentLoaded", async () => {
  const btn = document.getElementById("logoutBtn");
  if (btn) {
    btn.addEventListener("click", async () => {
      await fetch("/api/auth/logout", { method:"POST" });
      location.href = "/login.html";
    });
  }
});
