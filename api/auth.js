const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.model");
const { Restaurant } = require("../models/restaurant.model");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

router.post("/login", async (req, res) => {
  const { email = "", password = "" } = req.body;

  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user?.password);

  if (!user || !match) {
    return res.status(422).json({ message: "Credenciales incorrectas" });
  }

  res.json({ data: generateToken(user.id) });
});

router.post("/register", async (req, res) => {
  const { email = "", password = "" } = req.body;

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    email,
    password: hash,
  });

  await user.save();

  const restaurant = await Restaurant.create({ name: "Mi Restaurante", address: "", user: user.id });

  await restaurant.save();

  user.restaurant = restaurant.id;

  await user.save();

  res.status(201).json({ data: user });
});

module.exports = router;
