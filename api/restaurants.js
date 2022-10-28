const express = require("express");
const { Product } = require("../models/product.model");
const { Restaurant } = require("../models/restaurant.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find().populate("products");
  res.json({ data: restaurants });
});

router.get("/:id", async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate("products");

  if (!restaurant) {
    res.status(404).json({ message: "Registro no encontrado" });
  }

  res.json({ data: restaurant });
});

module.exports = router;
