const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/cart", (req, res) => {
  res.render("shop/cart");
});
router.get("/checkout", (req, res) => {
  res.render("shop/checkout");
});
router.get("/shop", async (req, res) => {
  const { category } = req.query;
  let title = req.query.title;
  // OBTENER TODOS LOS PRODUCTOS
  let product = await pool.query("SELECT * FROM productos");
  // OBTENER CATEGORIAS DE PRODUCTOS
  let categorys = await pool.query("SELECT DISTINCT category FROM productos");
  // OBTENER PRODUCTOS EN BASE A CATEGORIA Y TITULO EN QUERY
  if (category !== undefined && title !== undefined) {
    tituloBuscado = `%${title}%`;
    product = await pool.query(
      "SELECT * FROM productos WHERE category = ? && title LIKE ?",
      [category, tituloBuscado]
    );
  }
  // OBTENER PRODUCTOS EN BASE A CATEGORIA EN QUERY
  if (category !== undefined) {
    product = await pool.query("SELECT * FROM productos WHERE category = ?", [
      category,
    ]);
  }
  if (title !== undefined) {
    // CONVERSION PARA REALIZAR QUERY CORRECTAMENTE
    tituloBuscado = `%${title}%`;
    // CONVERSION PARA REALIZAR QUERY CORRECTAMENTE
    product = await pool.query("SELECT * FROM productos WHERE title LIKE ?", [
      tituloBuscado,
    ]);
  }
  res.render("shop", { product, categorys, title });
});

router.get("/shop/page/2", async (req, res) => {
  let product = await pool.query("SELECT * FROM productos WHERE id <= 2");
  res.render("shop", { product });
});

router.get("/shop/page/3", async (req, res) => {
  let product = await pool.query(
    "SELECT * FROM productos WHERE id > 2 && id <= 4;"
  );
  res.render("shop", { product });
});

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await pool.query("SELECT * FROM productos WHERE id = ?", [
    id,
  ]);
  res.render("shop/view-product", { product });
});

router.post("/product", async (req, res) => {
  const { title, price, description, image, category } = req.body;
  const newProduct = {
    title,
    price,
    description,
    image,
    category,
  };
  const product = await pool.query("INSERT INTO productos set ?", [newProduct]);
  res.send("Producto creado exitosamente");
  console.log(product);
});
module.exports = router;
