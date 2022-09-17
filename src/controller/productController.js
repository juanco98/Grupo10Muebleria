const db            = require('../database/models');
const Op            = db.Sequelize.Op;

const productController = {
    products: (req, res) => {
        return res.render('products/products', {
            tittle: 'Productos', 
            products: productsArray
        });
    },
    roomProducts: (req, res) => {

        let room = req.params.room.toLowerCase();

        db.Room.findOne({
            where: {
                name: {[Op.like]: room} 
            }
        }).then((room) => {
            return products = db.Product.findAll({
                include : [
                    {association: "models", 
                    include: [
                        {association: "property"},
                        {association: "feature"},
                        {association: "stock"},
                        {association: "prices",
                            include: [
                                {association: "discount"}
                            ]}
                    ]},
                    {association: "rooms",
                        where : {
                            id : room.id
                    }},
                    {association: "subCategory",
                        include: [
                            {association: "category"}
                        ]}
                ]
            })
        }).then((products) => {
            return res.render('products/products', {
                tittle  : 'Productos ' + capitalizeFirstLetter(room),
                room    : capitalizeFirstLetter(room),
                products: products
            });
        }).catch((err) => {
            console.log(err)
            return res.redirect('/');
        })

    },
    detailProduct: (req, res) => {

        let idProduct = req.params.id;

        db.Model.findOne({
            where: {
                id: idProduct
            },
            include : [
                {association: "product"},
                {association: "property"},
                {association: "feature"},
                {association: "prices", 
                    include: [{
                        association: "discount"
                    }]},
                {association: "stock"}
            ]
        }).then((model) => {
            return res.render('products/detailProducts', {
                tittle: 'Detalle Producto',
                model: model
            });
        }).catch((err) => {
            console.error(err)
        })

    },
    newProductPost: (req, res) => {

        let productImages   = [];
        req.files['productImages'].forEach(element => {
            productImages.push(element['filename']);
        });
        arrayMatWood    = strToArray(req.body.matWood);
        arrayMatMetal   = strToArray(req.body.matMetal);
        arrayMatCloth   = strToArray(req.body.matCloth);
        arrayMaOther    = strToArray(req.body.matOther);
        arrayColor      = strToArray(req.body.colors);

        db.Product.create({
            name: req.body.productName,
            brand: req.body.productMark,
            active: req.body.radioAvailable,
            id_user: req.session.userLogged.id,
            id_subcategory: req.body.subCategory
        }).then((newProduct) => {
            db.ProductRoom.create({
                id_product: newProduct.id,
                id_room: req.body.radioroom
            })
            return newProduct
        }).then((newProduct) => {
            return newModel = db.Model.create({
                name: req.body.productModel,
                description: req.body.productDesc,
                img: req.files['productImg'][0]['filename'],
                images: productImages.join(),
                id_product: newProduct.id
            })
        }).then(function(newModel) {
            db.Feature.create({
                height: req.body.sizeHeight,
                width: req.body.sizeWidth,
                deep: req.body.sizeDeep,
                weight: req.body.sizeWeigth,
                colors: arrayColor,
                id_model: newModel.id
            })
            return newModel
        }).then(function(newModel) {
            db.Property.create({
                wood: arrayMatWood,
                metal: arrayMatMetal,
                cloth: arrayMatCloth,
                other: arrayMaOther,
                id_model: newModel.id
            })
            return newModel
        }).then(function(newModel) {
            db.Price.create({
                value: req.body.productPrice,
                id_model: newModel.id
            })
            return newModel
        }).then(function(newModel) {
            db.Stock.create({
                available: req.body.radioAvailable,
                quantity: req.body.quantity,
                id_model: newModel.id
            })
        })
        .then(() => {
            return res.redirect('/user/profile/products')
        })
        .catch((err) => {
            console.log(err)
        })

    },
    editProductPricePut: (req, res) => {

    }
}

const strToArray = (str) => {
    let arr = str.split(',').map(function(item) {
        return item.trim();
      });
    return arr
}

// funcion para pasar la primer letra a mayuscula
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = productController; 