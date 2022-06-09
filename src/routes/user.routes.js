const express           = require ("express");
const routes            = express.Router();
const userController    = require ("../controller/userController");

//rutas
routes.get("/register", userController.register);
routes.get("/recover",  userController.recover);

module.exports = routes; 