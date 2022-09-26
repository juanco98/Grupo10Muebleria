const express   = require ("express");
const routes    = express.Router();

routes.use("/",         require("./main.routes"));
routes.use("/products", require("./products.routes"));
routes.use("/user",     require("./user.routes"));
routes.use("/cart",     require("./cart.routes"));
routes.use("/category", require("./category.routes"));

module.exports = routes;