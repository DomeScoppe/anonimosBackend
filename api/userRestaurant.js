const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const router = express.Router();

const { Product } = require("../models/product.model");
const { Restaurant } = require("../models/restaurant.model");
const { User } = require("../models/user.model");

router.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

router.get("/", async (req, res) => {
  const user = await User.findById(req.auth.id).populate("restaurant");
  res.json({ data: user });
});

router.put("/", async (req, res) => {
  const { name, address } = req.body;

  const restaurant = await Restaurant.findOneAndUpdate(
    { user: req.auth.id },
    {
      name,
      address,
    },
    {
      new: true,
    }
  );

  res.json({ data: restaurant });
});

router.get("/products", async (req, res) => {
  const restaurant = await Restaurant.findOne({ user: req.auth.id }).populate("products");

  res.json({ data: restaurant });
});

router.post("/products", async (req, res) => {
  const { name, type, description, price } = req.body;

  const restaurant = await Restaurant.findOne({ user: req.auth.id });

  const product = await Product.create({
    name,
    type,
    description,
    price,
    restaurant: restaurant,
  });

  await product.save();

  restaurant.products.push(product);

  await restaurant.save();

  res.json({ data: restaurant });
});

router.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json({ data: product });
});
router.put("/products/:id", async (req, res) => {
  const { name, type, description, price } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      type,
      description,
      price,
    },
    {
      new: true,
    }
  );

  res.json({ data: product });
});

router.delete("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  await product.delete();

  res.status(204).json();
});

module.exports = router;
