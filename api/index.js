const express = require("express");
const api = express.Router();

api.use("/auth", require("./auth"));
api.use("/restaurants", require("./restaurants"));

api.use("/user/restaurant", require("./userRestaurant"));

module.exports = api;
