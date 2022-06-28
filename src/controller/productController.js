const fs            = require('fs');
const path          = require('path');
const filePath      = path.resolve(__dirname, '../database/products.json');
let products        = fs.readFileSync(filePath, {encoding: 'utf-8'});
let productsArray   = JSON.parse(products);

const productController = {
    products: (req, res) => {
        res.render('products/products', {
            tittle: 'Productos', 
            products: productsArray
        });
    },
    roomProducts: (req, res) => {
        // saco el nombre de la habitacion y lo paso a minuscula para poder buscar bien
        let room = req.params.room.toLowerCase();
        let productsRoom;
        // busco en base a a la habitacion
        productsRoom = productsArray.filter(n => n.room.find(n => n == room) && n.available == 'true');
        res.render('products/products', {
            tittle  : 'Productos ' + capitalizeFirstLetter(room),
            room    : capitalizeFirstLetter(room),
            products: productsRoom
        });
    },
    detailProduct: (req, res) => {
        let idProduct = req.params.id;
        let product;
        product = productsArray.find(n => n.id == idProduct)
        res.render('products/detailProducts', {
            tittle: 'Detalle Producto',
            product: product
        });
    }
}

// funcion para pasar la primer letra a mayuscula
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = productController; 