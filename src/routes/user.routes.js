const express           = require ("express");
const routes            = express.Router();
const userController    = require ("../controller/userController");
const fileUpload        = require ("../middlewares/multerAvatar");
const userRegValidation = require ("../middlewares/formUserReg");
const userLogged        = require ("../middlewares/userLogged");
const userNotLogged     = require ("../middlewares/userNotLogged");
const multipleImgProd   = require ('../middlewares/multerProducts')

//rutas
routes.get("/register", userLogged, userController.register);
routes.post("/newRegister", fileUpload.single('avatar'), userRegValidation, userController.newRegister);

routes.post("/login", userController.login);
routes.get("/logout", userController.logout);

routes.get("/recover", userLogged, userController.recover);

routes.get("/profile", userNotLogged, userController.profile);
routes.get("/profile/:option", userNotLogged, userController.profileOption);

routes.get("/product/editProduct/:id", userNotLogged, userController.editProductGet);
routes.put("/product/editProduct/:id", userNotLogged, multipleImgProd, userController.editProductPut);

routes.get("/product/newProduct", userNotLogged, userController.newProductGet);
routes.post("/product/newProduct", userNotLogged, multipleImgProd, userController.newProductPost);

routes.delete("/product/deleteProduct/:id", userController.deleteProduct);

module.exports = routes; 