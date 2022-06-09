const productController = {
    products: (req, res) => {
        res.render('backoffice/products/products', {tittle: 'Productos'});
    },
    newProduct: (req, res) => {
        res.render('backoffice/products/newProduct', {tittle: 'Nuevo Producto'});
    },
    editProduct: (req, res) => {
        res.render('backoffice/products/editProduct', {tittle: 'Modificar Producto'});
    }
}

module.exports = productController; 