const express           = require ("express");
const routes            = express.Router();
const path              = require('path');
const multer            = require("multer");
const productController = require ("../../controller/backoffice/productController");

// configurando el almacenamiento
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/products')
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})
let fileUpload = multer({ storage });
const multipleImgProd = fileUpload.fields([{ name: 'productImg', maxCount: 1 }, { name: 'productImages', maxCount: 8 }])

//rutas
routes.get("/",                 productController.products);


routes.get("/newProduct",                   productController.newProductGet);
routes.post("/newProduct", multipleImgProd, productController.newProductPost);

routes.get("/editProduct/:id",                  productController.editProductGet);
routes.put("/editProduct/:id", multipleImgProd, productController.editProductPut);

routes.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = routes; 