const express = require("express");
const router = express.Router();
const pool = require("../database");
router.get("/", async (req, res) => {
  const product = await pool.query("SELECT * FROM productos");
  res.render("index", { product });
});
router.get("/about", (req, res) => {
  res.render("partials/about-us");
});
module.exports = router;
