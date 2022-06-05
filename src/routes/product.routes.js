const express           = require ("express");
const routes            = express.Router();
const productController = require ("../controller/productController");

//rutas
routes.get("/",                 productController.products);
routes.get("/detailProduct",    productController.detailProduct);

module.exports = routes; 