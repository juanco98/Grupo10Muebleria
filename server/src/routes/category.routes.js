const express           = require ("express");
const routes            = express.Router();
const categoryController = require ("../controller/categoryController");

// API REST
routes.get('/allCategories',                  categoryController.getAllCategories);

module.exports = routes; categoryController