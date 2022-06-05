const productController = {
    products: (req, res) => {
        res.render('products/products', {tittle: 'Productos'});
    },
    detailProduct: (req, res) => {
        res.render('products/detailProducts', {tittle: 'Detalle Producto'});
    }
}

module.exports = productController; 