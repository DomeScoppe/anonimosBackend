require("dotenv").config();
const express = require("express");
const { connection } = require("./db");
const app = express();
const port = 3000;

// mongo db connection

connection();
app.use(express.json());
app.use("/api", require("./api"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
