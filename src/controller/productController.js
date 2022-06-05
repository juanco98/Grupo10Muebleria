const productController = {
    products: (req, res) => {
        res.render('products/products');
    },
    detailProduct: (req, res) => {
        res.render('products/detailProducts');
    }
}

module.exports = productController; 