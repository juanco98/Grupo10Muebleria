const express   = require('express');
const router    = express.Router();


router.get('/', (req, res) => {
    res.render('products/products');
})

router.get('/product', (req, res) => {
    res.render('products/detailProducts');
})

module.exports = router;