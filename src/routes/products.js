const express   = require('express');
const router    = express.Router();
const pool      = require('../database');

router.get('/', (req, res) => {
    res.render('products/products');
})

router.get('/product', (req, res) => {
    res.render('products/detailProducts');
})

module.exports = router;