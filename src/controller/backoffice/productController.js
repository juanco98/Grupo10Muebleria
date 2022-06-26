const fs                    = require('fs');
const path                  = require('path');
const {json}                = require('express');
const {validationResult}    = require('express-validator');
const filePath              = path.resolve(__dirname, '../../database/products.json');
let products                = fs.readFileSync(filePath, {encoding: 'utf-8'});
let productsArray           = JSON.parse(products);

const productController = {
    products: (req, res) => {
        res.render('backoffice/products/products', {
            tittle: 'Productos', 
            products: productsArray
        });
    },
    newProductGet: (req, res) => {
        res.render('backoffice/products/newProduct', {tittle: 'Nuevo Producto'});
    },
    newProductPost: (req, res) => {

        // verifico que no haya errores
        const arrayErrors = validationResult(req);
        console.log("error =>", arrayErrors.errors.length);
        if (arrayErrors.errors.length > 0) {
            return res.render('create', {
               messageErrors: arrayErrors.mapped(),
               oldBodyData: req.body
           });
        }

        // cuento la cantidad de productos actuales, para saber el id
        let size = productsArray.length;

        // procedo a almacenar las variables para realizar el guardado
        const {
            productName,
            productDesc,
            productPrice,
            checkroom,
            matWood,
            matMetal,
            matCloth,
            matOther,
            sizeHeight,
            sizeWidth,
            sizeDeep,
            sizeWeigth,
            colors,
            productImg,
            productImages,
            radioAvailable,
            quantity
        } = req.body

        // pasos los string a array de los multiple
        arrayMatWood    = strToArray(matWood);
        arrayMatMetal   = strToArray(matMetal);
        arrayMatCloth   = strToArray(matCloth);
        arrayMaOther    = strToArray(matOther);
        arrayColor      = strToArray(colors);

        // los almaceno
        productsArray.push(
            {
                id:             size + 1,
                name:           productName,
                description:    productDesc,
                price:          productPrice,
                img:            productImg,
                images:         productImages,
                room:           checkroom,
                mats: {
                    wood:       arrayMatWood,
                    metal:      arrayMatMetal,
                    cloth:      arrayMatCloth,
                    others:     arrayMaOther
                },
                size: {
                    height:     sizeHeight,
                    width:      sizeWidth,
                    deep:       sizeDeep,
                    weight:     sizeWeigth
                },
                colors:         arrayColor,
                available:      radioAvailable,
                quantity:       quantity
            }
        )
        fs.writeFileSync(filePath, JSON.stringify(productsArray, null, ''))
        
        res.redirect('/admin/products/');
    },
    editProductGet: (req, res) => {
        let idProduct = req.params.id;
        let product;
        try {
            product = productsArray.find(n => n.id == idProduct)
        } catch (error) {
            console.error(error.message())
        }
        res.render('backoffice/products/editProduct', {
            tittle: 'Modificar Producto',
            product: product
        });
    }
}

const strToArray = (str) => {
    let arr = str.split(',').map(function(item) {
        return item.trim();
      });
    return arr
}

module.exports = productController; 