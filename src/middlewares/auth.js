const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  if (req.path === "/login") {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token JWT não provisionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Token JWT inválido" });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
