document.addEventListener("DOMContentLoaded", () => {
  const headerNav = document.querySelector(".nav");
  if (!headerNav) return;

  const btn = document.createElement("button");
  btn.textContent = "🌓";
  btn.className = "btn-outline";
  btn.style.fontSize = "0.9rem";
  headerNav.appendChild(btn);

  if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark");
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
  });
});
