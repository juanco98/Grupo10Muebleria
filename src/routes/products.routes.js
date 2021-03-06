const express           = require ("express");
const routes            = express.Router();
const productController = require ("../controller/productController");

//rutas
routes.get("/",                     productController.products);
routes.get("/roomProducts/:room",   productController.roomProducts);
routes.get("/detailProduct/:id",    productController.detailProduct);

module.exports = routes; 