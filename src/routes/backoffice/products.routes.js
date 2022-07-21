const express           = require ("express");
const routes            = express.Router();
const {productController} = require ("../../controller/backoffice/productController");
const multipleImgProd   = require ('../../middlewares/multerProducts')


//rutas
routes.get("/",                 productController.products);

routes.get("/newProduct",                   productController.newProductGet);
routes.post("/newProduct", multipleImgProd, productController.newProductPost);

routes.get("/editProduct/:id",                  productController.editProductGet);
routes.put("/editProduct/:id", multipleImgProd, productController.editProductPut);

routes.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = routes; 