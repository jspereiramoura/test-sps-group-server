const { Router } = require("express");
const {
  getAllUsers,
  findUserByEmail,
  addUser,
  updateUser,
  deleteUser,
  findUserById,
} = require("../repositories/userRepository");

const router = Router();

router.get("/", (_, res) => {
  res.json(getAllUsers());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(findUserById(id));
});

router.post("/", (req, res) => {
  const { name, email, type, password } = req.body;
  if (!name || !email || !type || !password) {
    return res.status(400).json({ error: "Um ou mais campos estão faltando" });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  const newUser = { name, email, type, password };
  addUser(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const { name, type, password } = req.body;
  const updatedUser = updateUser(id, { name, type, password });
  res.json(updatedUser);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUser(id);
  if (!success) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  res.sendStatus(204);
});

module.exports = router;
