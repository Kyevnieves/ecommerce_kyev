const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const multer = require("multer");
const { cloud, cloudinary } = require("../public/js/cloudinary");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images/products"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  dest: path.join(__dirname, "public/images/products"),
  limits: {
    fileSize: 1500000,
  },
  fileFilter: (req, file, cb) => {
    const fileType = /jpeg|jpg|png|webp/;
    const mimetype = fileType.test(file.mimetype);
    const extName = fileType.test(path.extname(file.originalname));
    if (mimetype && extName) {
      return cb(null, true);
    }
    cb("Error: debe ser una imagen soportada");
  },
}).single("image");

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

router.get("/products/add", async (req, res) => {
  res.render("shop/admin/add-product");
});
router.get("/upload", (req, res) => {
  res.render("shop/admin/add-img");
});
router.post("/upload", upload, (req, res) => {
  console.log(req.file);
  res.send("Subido");
});

router.post("/products/add", upload, async (req, res) => {
  const { title, price, description, category } = req.body;
  const filePath = req.file.path;
  const urlImg = await cloudinary.v2.uploader.upload(
    filePath,
    { public_id: "cloudinary" },
    function (error, result) {
      return result;
    }
  );
  const image = urlImg.url;
  const newProduct = {
    title,
    price,
    description,
    image,
    category,
  };
  const product = await pool.query("INSERT INTO productos set ?", [newProduct]);
  res.send("Producto creado exitosamente");
});
module.exports = router;
