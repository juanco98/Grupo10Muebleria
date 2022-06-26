const fs            = require('fs');
const path          = require('path');
const filePath      = path.resolve(__dirname, '../database/products.json');
let products        = fs.readFileSync(filePath, {encoding: 'utf-8'});
let productsArray    = JSON.parse(products);

const productController = {
    products: (req, res) => {
        res.render('products/products', {
            tittle: 'Productos', 
            products: productsArray
        });
    },
    detailProduct: (req, res) => {
        let idProduct = req.params.id;
        let product;
        try {
            product = productsArray.find(n => n.id == idProduct)
        } catch (error) {
            console.error(error.message())
        }
        res.render('products/detailProducts', {
            tittle: 'Detalle Producto',
            product: product
        });
    }
}

module.exports = productController; 