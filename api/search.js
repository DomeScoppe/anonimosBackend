const express = require("express");
const { Product } = require("../models/product.model");
const { Restaurant } = require("../models/restaurant.model");
const router = express.Router();

router.get("/", async (req, res) => {
	const { query } = req.query;

	const restaurants = await Restaurant.find({
		name: {
			$regex: query,
		},
	}).populate("products");

	const products = await Product.find({
		name: {
			$regex: query,
		},
	}).populate("restaurant");

	res.json({ data: { restaurants, products } });
});

module.exports = router;
