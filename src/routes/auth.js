const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../repositories/userRepository");

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Credenciais Inválidas" });
  }

  const token = jwt.sign(
    { email: user.email, type: user.type },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
});

module.exports = router;
