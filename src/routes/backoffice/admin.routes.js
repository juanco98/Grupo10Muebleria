const express   = require ("express");
const routes    = express.Router();

routes.use("/",         require("./main.routes"));
routes.use("/products", require("./products.routes"));

module.exports = routes;