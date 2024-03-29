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
            console.error(err)
            return res.redirect('/');
        })

    },
    sellerProducts: (req, res) => {

        let user = req.params.idUser;

        db.Product.findAll({
            include : [
                {association: "user",
                    where: {
                        id: user
                    }},
                {association: "models", 
                include: [
                    {association: "property"},
                    {association: "feature"},
                    {association: "stock"},
                    {association: "prices",
                        include: [
                            {association: "discount"}
                        ]}
                ]}
            ]
        }).then((products) => {
            return res.render('products/products', {
                tittle  : 'Productos ',
                room    : products[0].user.name + ' ' + products[0].user.last_name,
                products: products
            });
        }).catch((err) => {
            console.error(err)
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
                {association: "product",
                    include: [
                        {association: "user"}
                    ]},
                {association: "property"},
                {association: "feature"},
                {association: "prices", 
                    include: [
                        {association: "discount"}
                    ]},
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
    searchProducts: (req, res) => {
        let searchQuery = req.query.search_query
        if (searchQuery === '') {
            db.Product.findAll({
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
                    ]}
                ]
            }).then((products) => {
                return res.render('products/products', {
                    tittle  : 'Productos ',
                    room    : 'Todos',
                    products: products
                });
            }).catch((err) => {
                console.error(err)
                return res.redirect('/');
            })
        } else {
            db.Product.findAll({
                include : [
                    {association: "models",
                        where: {
                            description: {[Op.substring]: searchQuery}
                        }, 
                        include: [
                            {association: "property"},
                            {association: "feature"},
                            {association: "stock"},
                            {association: "prices",
                                include: [
                                    {association: "discount"}
                                ]}
                        ]}
                ]
            }).then((products) => {
                return res.render('products/products', {
                    tittle  : 'Productos ',
                    room    : searchQuery,
                    products: products
                });
            }).catch((err) => {
                console.error(err)
                return res.redirect('/');
            })
        }
    },
    newProductGet: (req, res) => {

        const rooms         = db.Room.findAll();
        const subCategories = db.SubCategory.findAll({
            include: [{association: "category"}]
        });
        const categories    = db.Category.findAll();

        Promise.all(
            [rooms, subCategories, categories]
        ).then(response => {
            return res.render('user/profile', {
                tittle          : 'Perfil',
                user            : req.session.userLogged,
                product         : null,
                option          : 'products',
                optionProducts  : 'newProduct',
                rooms           : response[0],
                subCategory     : response[1],
                category        : response[2]
            });
        }).catch(err => {
            console.error(err);
        });

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
                images: productImages,
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
        }).then(() => {
            return res.redirect('/user/profile/products')
        })
        .catch((err) => {
            console.error(err)
        })

    },
    editProductGet: (req, res) => {

        let id      = req.params.id

        const rooms         = db.Room.findAll();
        const subCategories = db.SubCategory.findAll({
            include: [{association: "category"}]
        });
        const categories    = db.Category.findAll();
        const model = db.Model.findOne({
            where : {
                id: id
            },
            include : [
                {association: "product",
                    include : [
                        {association: "rooms"}
                    ]},
                {association: "property"},
                {association: "feature"},
                {association: "stock"},
                {association: "prices",
                    include: [
                        {association: "discount"}
                    ]
                }
            ]
        })

        Promise.all(
            [rooms, subCategories, categories, model]
        ).then(response => {
            return res.render('user/profile', {
                tittle          : 'Perfil',
                user            : req.session.userLogged,
                rooms           : response[0],
                subCategory     : response[1],
                category        : response[2],
                model           : response[3],
                option          : 'products',
                optionProducts  : 'editProduct'
            });
        }).catch(err => {
            console.error(err);
        });

    },
    editProductPut: (req, res) => {

        let productImages   = [];
        req.body.checkImgGal.forEach(element => {
            productImages.push(element);
        });
        arrayMatWood    = strToArray(req.body.matWood);
        arrayMatMetal   = strToArray(req.body.matMetal);
        arrayMatCloth   = strToArray(req.body.matCloth);
        arrayMaOther    = strToArray(req.body.matOther);
        arrayColor      = strToArray(req.body.colors);

        let id = req.params.id

        db.Model.update({
            name: req.body.productModel,
            description: req.body.productDesc,
            img: req.body.imgMain,
            images: productImages,
        }, {
            where: {
                id: id
            }
        }).then(() => {
            return db.Model.findByPk(id)
        }).then((model) => {
            db.Product.update({
                name: req.body.productName,
                brand: req.body.productMark,
                active: req.body.radioAvailable,
            },{
                where: {
                    id: model.id_product
                }
            })
            return model
        }).then((model)=> {
            db.Feature.update({
                height: req.body.sizeHeight,
                width: req.body.sizeWidth,
                deep: req.body.sizeDeep,
                weight: req.body.sizeWeigth,
                colors: arrayColor,
            },{
                where: {
                    id_model: model.id
                }
            })
            return model
        }).then((model)=> {
            db.Property.update({
                wood: arrayMatWood,
                metal: arrayMatMetal,
                cloth: arrayMatCloth,
                other: arrayMaOther,
            },{
                where: {
                    id_model: model.id
                }
            })
            return model
        }).then((model)=> {
            db.Price.update({
                value: req.body.productPrice,
            },{
                where: {
                    id_model: model.id
                }
            })
            return model
        }).then((model) => {
            db.Stock.update({
                available: req.body.radioAvailable,
                quantity: req.body.quantity,
            },{
                where: {
                    id_model: model.id
                }
            })
        }).then(() => {
            return res.redirect('/user/profile/products')
        }).catch((err) => {
            console.error(err)
        })

    },
    getModelsForCart: (req, res) => {
        res.status(200).json(req.body)
        let modelId = req.body
        db.Model.findAll({
            where: {
                id: { [Op.in]: modelId },
            },
            include : [
                {association: "product",
                    include: [
                        {association: "user"}
                    ]},
                {association: "property"},
                {association: "feature"},
                {association: "prices", 
                    include: [
                        {association: "discount"}
                    ]},
                {association: "stock"}
            ]
        })
        .then((model) => res.status(200).json(model))
    },
    // BORRAR PRODUCTO
    deleteProduct: (req, res) => {
        let id = req.params.id
        db.Feature.destroy({
            where: {
                id_model : id
            }
        }).then(() => {
            db.Property.destroy({
                where: {
                    id_model : id
                }
            })
        }).then(() => {
            db.Price.destroy({
                where: {
                    id_model : id
                }
            })
        }).then(() => {
            db.Stock.destroy({
                where: {
                    id_model : id
                }
            })
        }).then(() => {
            return db.Model.findByPk(id)
        }).then((model) => {
            db.ProductRoom.destroy({
                where: {
                    id_product: model.id_product
                }
            })
            return model
        }).then((model) => {
            db.Model.destroy({
                where: {
                    id: id
                }
            })
            return model
        }).then((model) => {
            db.Product.destroy({
                where: {
                    id: model.id_product
                }
            })
        }).then(() => {
            return res.redirect('/user/profile/products')
        }).catch((err) => {
            console.error(err)
        })

    },
    getAllProductsAPI: (req, res) => {
        db.Product.findAll({
            include: [
                {association: 'user'},
                {association: 'rooms'},
                {association: 'subCategory',
                    include: [
                        {association: 'category'}
                    ]},
                {association: 'models',
                    include: [
                        {association: 'property'},
                        {association: 'feature'},
                        {association: 'stock'},
                        {association: 'prices',
                            include: [
                                {association : 'discount'}
                            ]},
                    ]}
            ],
            order: [
                ['id', 'ASC'],
            ],
        }).then((products) => {
            return res.status(200).json({
                products: products,
                quantity: products.length
            })
        }).catch((err) => {
            console.error(err)
            return res.status(500).json({
                error: err
            })
        })
    },
    detailProductAPI: (req, res) => {
        let id = req.params.id
        db.Product.findOne({
            where: {
                id: id
            },
            include: [
                {association: 'user'},
                {association: 'rooms'},
                {association: 'subCategory',
                    include: [
                        {association: 'category'}
                    ]},
                {association: 'models',
                    include: [
                        {association: 'property'},
                        {association: 'feature'},
                        {association: 'stock'},
                        {association: 'prices',
                            include: [
                                {association : 'discount'}
                            ]},
                    ]}
            ]
        }).then((product) => {
            return res.status(200).json({
                product: product,
            })
        }).catch((err) => {
            console.error(err)
            return res.status(500).json({
                error: err
            })
        })
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