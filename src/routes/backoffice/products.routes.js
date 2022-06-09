const express           = require ("express");
const routes            = express.Router();
const productController = require ("../../controller/backoffice/productController");

//rutas
routes.get("/",             productController.products);
routes.get("/newProduct",   productController.newProduct);
routes.get("/editProduct",  productController.editProduct);

module.exports = routes; 