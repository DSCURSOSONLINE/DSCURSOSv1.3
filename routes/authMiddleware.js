function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ error: "Não autenticado" });
}

function isAdmin(req, res, next) {
  if (req.session?.user?.admin === 1) return next();
  return res.status(403).json({ error: "Acesso negado" });
}

module.exports = { isAuthenticated, isAdmin };
