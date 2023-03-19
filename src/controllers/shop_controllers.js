const pool = require("../database");

const buscarPorTitulo = async (title) => {
  // CONVERSION PARA REALIZAR QUERY CORRECTAMENTE
  title = `%${title}%`;
  // CONVERSION PARA REALIZAR QUERY CORRECTAMENTE
  return await pool.query("SELECT * FROM productos WHERE title LIKE ?", [
    title,
  ]);
};
const buscarPorCategoria = async (category) => {
  return await pool.query("SELECT * FROM productos WHERE category = ?", [
    category,
  ]);
};
const buscarPorTituloYCategoria = async (title, category) => {
  title = `%${title}%`;
  return await pool.query(
    "SELECT * FROM productos WHERE category = ? && title LIKE ?",
    [category, title]
  );
};
const buscarPorPrecio = async (price) => {
  return await pool.query(`SELECT * FROM productos WHERE price <= ?`, [price]);
};
const buscarPorCategoriaYPrecio = async (category, price) => {
  return await pool.query(
    `SELECT * FROM productos WHERE price <= ? && category = ?`,
    [price, category]
  );
};
const priceMinpriceMax = async (pricemin, pricemax) => {
  return await pool.query(
    `SELECT * FROM productos WHERE price BETWEEN ? AND ?;`,
    [pricemin, pricemax]
  );
};

const shop = async (req, res, next) => {
  // OBTENER CATEGORIAS DE PRODUCTOS
  // let categorys = await pool.query("SELECT DISTINCT category FROM productos");
  let { price, category, title, pricemin, pricemax } = req.query;
  // OBTENER LOS PRIMEROS 10 PRODUCTOS
  let product = await pool.query(`SELECT * FROM productos WHERE id <= 10`);
  let countCategorys = await pool.query(
    "SELECT category, COUNT(*) FROM productos GROUP BY category;"
  );
  const categorys = [];
  const result = countCategorys.forEach((element) => {
    categorys.push(
      JSON.parse(JSON.stringify(element).replace("count(*)", "Cantidad"))
    );
  });
  // OBTENER PRODUCTOS EN BASE A PRECIO MIN Y PRECIO MAX
  pricemin !== undefined && pricemax !== undefined
    ? (product = await priceMinpriceMax(pricemin, pricemax))
    : next;
  // OBTENER PRODUCTOS EN BASE A CATEGORIA Y TITULO EN QUERY
  category !== undefined && title !== undefined
    ? (product = await buscarPorTituloYCategoria(title, category))
    : next;
  // OBTENER PRODUCTOS EN BASE A CATEGORIA EN QUERY
  category !== undefined
    ? (product = await buscarPorCategoria(category))
    : next;
  // OBTENER PRODUCTOS EN BASE A TITULO EN QUERY
  title !== undefined ? (product = await buscarPorTitulo(title)) : next;
  // OBTENER PRODUCTOS EN BASE A CATEGORIA Y PRECIO EN QUERY
  price !== undefined ? (product = await buscarPorPrecio(price)) : next;
  price !== undefined && category !== undefined
    ? (product = await buscarPorCategoriaYPrecio(category, price))
    : next;
  res.render("shop", { product, categorys, title, price });
};

const shopPage2 = async (req, res) => {
  let categorys = await pool.query("SELECT DISTINCT category FROM productos");
  let inicia = 10;
  let termina = 20;
  let product = await pool.query(
    `SELECT * FROM productos WHERE id > ${inicia} && id <= ${termina};`
  );
  res.render("shop", { product, categorys });
};
const carrito = (req, res) => {
  res.render("shop/cart");
};
const checkout = (req, res) => {
  res.render("shop/checkout");
};
const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  const product = await pool.query("SELECT * FROM productos WHERE id = ?", [
    id,
  ]);
  res.render("shop/view-product", { product });
};

module.exports = {
  carrito,
  checkout,
  shop,
  shopPage2,
  obtenerProducto,
};
