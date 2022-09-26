const express           = require ("express");
const routes            = express.Router();
const categoryController = require ("../controller/categoryController");

// API REST
routes.get('/api/allCategories',                  categoryController.getAllCategoriesAPI);

module.exports = routes; categoryController