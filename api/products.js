const express = require("express");
const { Product } = require("../models/product.model");
const router = express.Router();

router.get("/", async (_, res) => {
  const products = await Product.find().populate("restaurant");
  res.json({ data: products });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("restaurant");

  if (!product) {
    res.status(404).json({ message: "Registro no encontrado" });
  }

  res.json({ data: product });
});

module.exports = router;
