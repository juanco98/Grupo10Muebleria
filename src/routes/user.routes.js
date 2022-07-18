const express           = require ("express");
const routes            = express.Router();
const userController    = require ("../controller/userController");
const fileUpload        = require ("../middlewares/multerAvatar");
const userRegValidation = require ("../middlewares/formUserReg");
const userLogged        = require ("../middlewares/userLogged");
const userNotLogged     = require ("../middlewares/userNotLogged");

//rutas
routes.get("/register", userLogged,userController.register);
routes.post("/newRegister", fileUpload.single('avatar'), userRegValidation, userController.newRegister);

routes.post("/login", userController.login);
routes.get("/logout", userController.logout);

routes.get("/recover", userLogged, userController.recover);

routes.get("/profile", userNotLogged, userController.profile);

module.exports = routes; 