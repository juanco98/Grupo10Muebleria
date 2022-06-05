const express           = require ("express");
const routes            = express.Router();
const cartController    = require ("../controller/cartController");

//rutas
routes.get("/detailCart", cartController.detailCart);

module.exports = routes; 