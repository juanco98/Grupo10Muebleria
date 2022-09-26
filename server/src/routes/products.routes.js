const express           = require ("express");
const routes            = express.Router();
const productController = require ("../controller/productController");

//rutas
routes.get("/",                             productController.products);
routes.get("/search",                       productController.searchProducts);
routes.get("/roomProducts/:room",           productController.roomProducts);
routes.get("/sellerProducts/:idUser",       productController.sellerProducts);
routes.get("/detailProduct/:id",            productController.detailProduct);
routes.post('/modelsForCart',               productController.getModelsForCart);

// API REST
routes.get('/allProducts',                  productController.getAllProducts);

module.exports = routes; 