const express   = require ("express");
const routes    = express.Router();

routes.use("/",         require("./main.routes"));
routes.use("/products", require("./product.routes"));
routes.use("/user",     require("./user.routes"));
routes.use("/cart",     require("./cart.routes"));

module.exports = routes;