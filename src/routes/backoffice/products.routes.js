const express           = require ("express");
const routes            = express.Router();
const productController = require ("../../controller/backoffice/productController");

//rutas
routes.get("/",                 productController.products);
routes.get("/newProduct",       productController.newProductGet);
routes.post("/newProduct",      productController.newProductPost);
routes.get("/editProduct/:id",  productController.editProductGet);

module.exports = routes; 