const express = require("express");
const router = express.Router();
const pool = require("../database");
const path = require("path");
const { upload } = require("../lib/multer");
const {
  carrito,
  checkout,
  shop,
  shopPage2,
  obtenerProducto,
  viewAgregarProducto,
  agregarProductoBD,
  viewEditarProducto,
  editarProductoBD,
} = require("../controllers/shop_controllers");

router.get("/cart", carrito);
router.get("/checkout", checkout);
router.get("/shop", shop);
router.get("/shop/page/2", shopPage2);
router.get("/product/:id", obtenerProducto);
router.get("/products/add", viewAgregarProducto);
router.get("/products/edit/:id", viewEditarProducto);
// RUTAS POST
router.post("/products/add", upload, agregarProductoBD);
router.post("/products/edit/:id", upload, editarProductoBD);
module.exports = router;
