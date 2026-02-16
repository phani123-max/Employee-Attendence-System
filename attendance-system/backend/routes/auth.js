const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
    role: req.body.role,
    employeeId: "EMP" + Date.now()
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user.id, role: user.role }, "secret");

  res.json({ token, user });
});

module.exports = router;
