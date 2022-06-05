const express           = require ("express");
const routes            = express.Router();
const mainController    = require ("../controller/mainController");

//rutas
routes.get("/",         mainController.home);
routes.get("/aboutus",  mainController.aboutUs);
routes.get("/contact",  mainController.contact);

module.exports = routes; 