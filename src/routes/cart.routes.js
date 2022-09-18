const express           = require ("express");
const routes            = express.Router();
const cartController    = require ("../controller/cartController");
const productController = require ("../controller/productController");

//rutas
routes.get("/detailCart",                   cartController.detailCart);
routes.get('/addToCart/:modelId',      cartController.addModelToCart);
routes.get('/modelsForCart',                productController.getModelsForCart);

module.exports = routes; 