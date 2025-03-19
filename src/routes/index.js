const { Router } = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const { authenticateToken } = require("../middlewares/auth");

const router = Router();

// Cadastrando rotas publicas
router.use(authRoutes);

// Cadastrando middleware de autenticação e rotas privadas (CRUD Usuário)
router.use(authenticateToken).use("/users", userRoutes);

module.exports = router;
