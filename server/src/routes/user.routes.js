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
routes.get("/login", userLogged, userController.loginGet);
routes.post("/login", userController.loginPost);

// logout
routes.get("/logout", userController.logout);

// recover
routes.get("/recover", userLogged, userController.recover);

// perfil
routes.get("/profile", userNotLogged, userController.profile);
routes.get("/profile/:option", userNotLogged, userController.profileOption);

// product
routes.get("/product/editProduct/:id", userNotLogged, productController.editProductGet);
routes.put("/product/editProduct/:id", userNotLogged, multipleImgProd, productController.editProductPut);

routes.get("/product/newProduct", userNotLogged, productController.newProductGet);
routes.post("/product/newProduct", userNotLogged, multipleImgProd, productController.newProductPost);

routes.delete("/product/deleteProduct/:id", productController.deleteProduct);


// API REST
routes.get('/api/allUsers',             userController.getAllUsersAPI);
routes.get('/api/detailUser/:id',       userController.detailUserAPI);
routes.get('/api/findEmail/:email',     userController.validationEmailAPI);

module.exports = routes; 