const express           = require ("express");
const routes            = express.Router();
const userController    = require ("../controller/userController");
const fileUpload        = require ("../utils/multerAvatar");
const userRegValidation = require("../middlewares/formUserReg");

//rutas
routes.get("/register",                         userController.register);
routes.post("/newRegister", fileUpload.single('userAvatar'), userRegValidation, userController.newRegister);

routes.get("/recover",                          userController.recover);

routes.get("/profile",                          userController.profile);

module.exports = routes; 