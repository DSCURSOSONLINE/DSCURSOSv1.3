const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "segredo-trocar",
  resave: false,
  saveUninitialized: false
}));

// front estático
app.use(express.static(path.join(__dirname, "public")));

// rotas API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/modulos", require("./routes/modulos"));
app.use("/api/aulas", require("./routes/aulas"));
app.use("/api/enrollments", require("./routes/enrollments"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/estatisticas", require("./routes/estatisticas"));
app.use("/api/comentarios", require("./routes/comentarios"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/certificados", require("./routes/certificados"));
app.use("/api/admin", require("./routes/adminDashboard"));
app.use("/api/search", require("./routes/search"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

