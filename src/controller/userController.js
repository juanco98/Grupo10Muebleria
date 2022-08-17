const fs        = require('fs');
const path      = require('path');

const {validationResult}    = require('express-validator');
const bcryptjs              = require('bcryptjs');
const Product               = require('../models/Products');
const db                    = require('../database/models');

const {ExtProductController}    = require('../controller/backoffice/productController');

const userController = {
    // REGISTROS
    // GET
    register: (req, res) => {
        return res.render('user/register', {
            tittle: 'Registrate',
        });
    },
    // POST
    newRegister: (req, res) => {

        if (validationResult(req).errors.length > 0) {
            deleteFile(req)
            return res.render('user/register', {
                tittle:     'Registrate',
                errors:     resVal.mapped(),
                oldData:    req.body
            });
        }

        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then((email)=>{
            if (email) {
                deleteFile(req)
                returnErrReg('email', req, res);
                throw new Error("email ya existe");
            }
        }).then(() => {
            db.User.findOne({
                where: {
                    user: req.body.user
                }
            })
        }).then((user) => {
            if (user) {
                deleteFile(req)
                returnErrReg('user', req, res);
                throw new Error("user ya existe");
            }
        }).then(() => {
            return newUser = db.User.create({
                name        : req.body.name,
                last_name   : req.body.lastName,
                born_date   : req.body.bornDate,
                email       : req.body.email,
                user        : req.body.user,
                password    : bcryptjs.hashSync(req.body.pass, 10),
                avatar      : req.file.filename,
                id_role     : 2
            })
        }).then(function(newUser) {
            db.Address.create({
                name            : req.body.nameAddress,
                description     : req.body.descriptionAddress,
                city            : req.body.city,
                state           : req.body.state,
                postal_code     : req.body.postalCode,
                address         : req.body.address,
                number_address  : req.body.numberAddress,
                number_floor    : req.body.numberFloor,
                number_apartment: req.body.numberApartment,
                id_user         : newUser.id
            })
            return newUser
        }
        ).then(function(newUser) {
            req.session.userLogged = newUser;
            return res.redirect('profile');
        }).catch((error) => {
            console.log(error)
        });

    },
    // RECUPERAR CONTRASEÑA
    // GET
    recover: (req, res) => {
        return res.render('user/recover', {tittle: 'Recuperar'});
    },
    // POST
    sendRecover: (req, res) => {
        // TODO
    },
    // LOGIN
    // POST
    login: (req, res) => {

        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (!user){
                returnErrLog('email', req, res);
            }
            return user
        }).then((user) => {
            let okPass = bcryptjs.compareSync(req.body.pass, user.password)
            if (!okPass) {
                returnErrLog('pass', req, res);
            }
            return user
        }).then((user) => {
            delete user.password;
            req.session.userLogged = user;
            if (req.body.remember) {
                res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
            }
            return res.redirect('profile');
        })

    },
    // LOGOUT
    // GET
    logout: (req, res) => {

        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');

    },
    // PERFIL
    // GET
    profile: (req, res) => {

        return res.render('user/profile', {
            tittle  : 'Perfil',
            user    : req.session.userLogged,
            option  : null
        });

    },
    // GET
    profileOption: (req, res) => {

        let option = req.params.option
        if (option == 'data') {
            return res.render('user/profile', {
                tittle  : 'Perfil',
                user    :   req.session.userLogged,
                option  :   option
            });
        } else if (option == 'products') {
            db.Model.findAll({
                include : [
                    {association: "product",
                        where : {
                            id_user: req.session.userLogged.id
                        }, 
                    },
                    {association: "property"},
                    {association: "feature"},
                    {association: "stock"},
                    {association: "prices",
                        include: [
                            {association: "discount"}
                        ]
                    }
                ]
            }).then((models) =>{
                return res.render('user/profile', {
                    tittle          : 'Perfil',
                    user            : req.session.userLogged,
                    option          : option,
                    models          : models,
                    optionProducts  : null
                });
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            return res.redirect('/user/profile')
        }

    },
    // EDITAR PRODUCTO
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
            console.log(err);
        });

        // .then((model) =>{
        //     return res.render('user/profile', {
        //         tittle          : 'Perfil',
        //         user            : req.session.userLogged,
        //         model           : model,
        //         option          : 'products',
        //         optionProducts  : 'editProductPrice'
        //     });
        // })
        // .catch((err) => {
        //     console.log(err);
        // })


    },
    editProductPut: (req, res) => {

        let editedProd = ExtProductController.editProduct(req)
        return res.redirect('/user/profile/products')

    },
    // CREAR PRODUCTO
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
            console.log(err);
        });

    },
    // BORRAR PRODUCTO
    deleteProduct: (req, res) => {

        let deletedProduct = ExtProductController.deleteProduct(req)
        return res.redirect('/user/profile/products')

    }
}

function deleteFile(req) {
    if (req.file) {
        if (req.file.filename) {
            let name = req.file.filename
            fs.unlinkSync(path.join(__dirname, '../public/images/users', name))
        }
    }
}

function returnErrReg(field, req, res) {
    if (field == 'email') {
        return res.render('user/register', {
            tittle:     'Registrate',
            errors: {
                email : {
                    msg: `Este ${field} ya está registrado.`
                }
            },
            oldData:    req.body
        });
    } else {
        return res.render('user/register', {
            tittle:     'Registrate',
            errors: {
                user : {
                    msg: `Este ${field} ya está registrado.`
                }
            },
            oldData:    req.body
        });
    }
}

function returnErrLog(field, req, res) {
    if (field == 'email') {
        return res.render('home/home', {
            errors: {
                email: {
                    msg: 'No se encuentra ese email.'
                }
            },
            oldData: req.body,
            tittle: null
        })
    } else {
        return res.render('home/home', {
            errors: {
                pass: {
                    msg: 'No coincide la contraseña'
                }
            },
            oldData: req.body,
            tittle: null
        })
    }
}

module.exports = userController; 