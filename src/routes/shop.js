const express = require("express");
const router = express.Router();
const { upload } = require("../lib/multer");
const {
  carrito,
  checkout,
  shop,
  shopPage2,
  obtenerProducto,
} = require("../controllers/shop_controllers");

router.get("/cart", carrito);
router.get("/checkout", checkout);
router.get("/shop", shop);
router.get("/shop/page/2", shopPage2);
router.get("/product/:id", obtenerProducto);

module.exports = router;
