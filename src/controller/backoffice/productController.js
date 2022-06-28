const fs                    = require('fs');
const path                  = require('path');
const {json}                = require('express');
const {validationResult}    = require('express-validator');
const jsonMethods           = require('../../database/jsonMethods');
const productsModel         = jsonMethods('products');
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
            productMark,
            productModel,
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
            radioAvailable,
            quantity
        } = req.body

        // almaceno las imagenes
        productImg          = req.files['productImg'][0]['filename']
        let productImages   = [];
        req.files['productImages'].forEach(element => {
            productImages.push(element['filename']);
        });

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
                mark:           productMark,
                model:          productModel,
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
    },
    editProductPut: (req, res) => {
        // guardo el id enviado por parametro
        let productId = req.params.id;

        // verifico que no haya errores
        const arrayErrors = validationResult(req);
        console.log("error =>", arrayErrors.errors.length);
        if (arrayErrors.errors.length > 0) {
            return res.render('create', {
                messageErrors: arrayErrors.mapped(),
                oldBodyData: req.body
            });
        }

        // procedo a almacenar las variables para realizar el guardado
        const {
            productName,
            productMark,
            productModel,
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
            radioAvailable,
            quantity
        } = req.body

        let cambioImgGaleria = false;
        let agregoImgGaleria = false;
        if ( req.files['productImg'] ) {
            cambioImgGaleria = true;
            productImg = req.files['productImg'][0]['filename']
        }
        let arrayImgGalery   = [];
        if (req.files['productImages'] ) {
            agregoImgGaleria = true;
            req.files['productImages'].forEach(element => {
                arrayImgGalery.push(element['filename']);
            });
        }

        // pasos los string a array de los multiple
        arrayMatWood    = strToArray(matWood);
        arrayMatMetal   = strToArray(matMetal);
        arrayMatCloth   = strToArray(matCloth);
        arrayMaOther    = strToArray(matOther);
        arrayColor      = strToArray(colors);

        productsArray.forEach(product => {
            if ( product.id == productId ) {
                product.name        = productName;
                product.mark        = productMark;
                product.model       = productModel;
                product.description = productDesc;
                product.price       = productPrice;
                product.room        = checkroom;
                if (cambioImgGaleria) {
                    product.img     = productImg;
                }
                if (agregoImgGaleria) {
                    product.images.forEach(element => {
                        arrayImgGalery.push(element)
                    })
                    product.images  = arrayImgGalery;
                }
                product.mats.wood   = arrayMatWood
                product.mats.metal  = arrayMatMetal
                product.mats.cloth  = arrayMatCloth
                product.mats.others = arrayMaOther
                product.size.height = sizeHeight
                product.size.width  = sizeWidth
                product.size.deep   = sizeDeep
                product.size.weight = sizeWeigth
                product.colors      = arrayColor
                product.available   = radioAvailable
                product.quantity    = quantity
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(productsArray, null, ''),
            {encoding: "utf-8"}
        );

        res.redirect('/admin/products/');
    },
    deleteProduct:(req, res) => {
        // guardo el id enviado por parametro
        let productId = req.params.id;

        // lo filtro
        newProductsArray = productsArray.filter((product) => product.id != productId)

        // lo guardo
        fs.writeFileSync(filePath, JSON.stringify(newProductsArray, null, ''),
            {encoding: "utf-8"}
        );
        
        // le doy un setTimeout para que le de tiempo a rescribir todo de vuelta
        setTimeout(() => {
        }, 2000);

        res.redirect('/admin/products/');
    }
}

const strToArray = (str) => {
    let arr = str.split(',').map(function(item) {
        return item.trim();
      });
    return arr
}

module.exports = productController; 