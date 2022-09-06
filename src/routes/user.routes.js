const express           = require ("express");
const routes            = express.Router();
const userController    = require ("../controller/userController");
const productController = require ("../controller/productController");
const fileUpload        = require ("../middlewares/multerAvatar");
const userRegValidation = require ("../middlewares/formUserReg");
const userLogged        = require ("../middlewares/userLogged");
const userNotLogged     = require ("../middlewares/userNotLogged");
const multipleImgProd   = require ('../middlewares/multerProducts')

// rutas
routes.get("/register", userLogged, userController.register);
routes.post("/newRegister", fileUpload.single('avatar'), userRegValidation, userController.newRegister);

// login
routes.get("/login", userController.loginGet);
routes.post("/login", userController.loginPost);

// logout
routes.get("/logout", userController.logout);

// recover
routes.get("/recover", userLogged, userController.recover);

// perfil
routes.get("/profile", userNotLogged, userController.profile);
routes.get("/profile/:option", userNotLogged, userController.profileOption);

// product
routes.get("/product/editProduct/:id", userNotLogged, userController.editProductGet);
routes.put("/product/editProduct/:id", userNotLogged, multipleImgProd, userController.editProductPut);

routes.get("/product/editProductPrice/:id", userNotLogged, userController.editProductGet);
routes.put("/product/editProductPrice/:id", userNotLogged, productController.editProductPricePut);

routes.get("/product/newProduct", userNotLogged, userController.newProductGet);
routes.post("/product/newProduct", userNotLogged, multipleImgProd, productController.newProductPost);

routes.delete("/product/deleteProduct/:id", userController.deleteProduct);

module.exports = routes; 