const express           = require ("express");
const routes            = express.Router();
const mainController    = require ("../../controller/backoffice/mainController");

//rutas
routes.get("/",         mainController.home0);
routes.post("/",        mainController.home);
routes.get("/connect",  mainController.connect);

module.exports = routes; 