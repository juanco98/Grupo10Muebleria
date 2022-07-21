const fs        = require('fs');
const path      = require('path');

const {validationResult}    = require('express-validator');
const bcryptjs              = require('bcryptjs');
const User                  = require('../models/User');
const Product               = require('../models/Products');

const {ExtProductController}    = require('../controller/backoffice/productController');

const userController = {
    // REGISTROS
    // GET
    register: (req, res) => {
        return res.render('user/register', {tittle: 'Registrate'});
    },
    // POST
    newRegister: (req, res) => {
        const resVal = validationResult(req);

        if (resVal.errors.length > 0) {
            deleteFile(req)
            return res.render('user/register', {
                tittle:     'Registrate',
                errors:     resVal.mapped(),
                oldData:    req.body
            });
        }

        let emailInDB   = User.findByField('email', req.body.email)
        let userInDB    = User.findByField('user',  req.body.user)

        if (emailInDB) {
            deleteFile(req);
            returnErrReg('email', req, res);
            throw new Error("email ya existe");
        } else if (userInDB) {
            deleteFile(req)
            returnErrReg('user', req, res);
            throw new Error("usuario ya existe");
        }

        delete req.body.pass2

        let newUser = {
            ...req.body,
            pass:   bcryptjs.hashSync(req.body.pass, 10),
            role: 'user',
            avatar: req.file.filename
        }

        User.create(newUser)

        return res.redirect('profile');
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
        let userLog = User.findByField('email', req.body.email);

        if(!userLog) {
            returnErrLog('email', req, res);
        } else {
            let okPass = bcryptjs.compareSync(req.body.pass, userLog.pass)
            if (!okPass) {
                returnErrLog('pass', req, res);
            }
        }

        delete userLog.pass;
        delete userLog.pass2;

        req.session.userLogged = userLog;

        if (req.body.remember) {
            res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
        }

        return res.redirect('profile');
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
            let idUser   = req.session.id
            // let products = Product.findByField('userId', idUser);
            let products = Product.findAll();
            return res.render('user/profile', {
                tittle          : 'Perfil',
                user            : req.session.userLogged,
                option          : option,
                products        : products,
                optionProducts  : null
            });
        } else {
            return res.redirect('/user/profile')
        }
    },
    // EDITAR PRODUCTO
    editProductGet: (req, res) => {
        let id      = req.params.id
        let product = Product.findById(id);
        return res.render('user/profile', {
            tittle          : 'Perfil',
            user            : req.session.userLogged,
            product         : product,
            option          : 'products',
            optionProducts  : 'editProduct'
        });
    },
    editProductPut: (req, res) => {
        let editedProd = ExtProductController.editProduct(req)
        return res.redirect('/user/profile/products')
    },
    // CREAR PRODUCTO
    newProductGet: (req, res) => {
        return res.render('user/profile', {
            tittle          : 'Perfil',
            user            : req.session.userLogged,
            product         : null,
            option          : 'products',
            optionProducts  : 'newProduct'
        });
    },
    newProductPost: (req, res) => {
        let createdProd = ExtProductController.createProduct(req)
        return res.redirect('/user/profile/products')
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