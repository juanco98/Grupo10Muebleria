const fs        = require('fs');
const path      = require('path');

const {validationResult}    = require('express-validator');
const bcryptjs              = require('bcryptjs');
const db                    = require('../database/models');
const { send } = require('process');
const { count } = require('console');

const userController = {
    // REGISTROS
    // GET
    register: (req, res) => {
        return res.render('user/user', {
            tittle  : 'Registrate',
            site    : 'reg'
        });
    },
    // POST
    newRegister: (req, res) => {

        if (validationResult(req).errors.length > 0) {
            deleteFile(req)
            return res.render('user/user', {
                tittle  : 'Registrate',
                errors  : resVal.mapped(),
                site    : 'reg',
                oldData : req.body
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
            console.error(error)
        });

    },
    // RECUPERAR CONTRASEÑA
    // GET
    recover: (req, res) => {
        return res.render('user/user', {
            tittle  : 'Recuperar',
            site    : 'rec'
        });
    },
    // POST
    sendRecover: (req, res) => {
        // TODO
    },
    // LOGIN
    loginGet: (req, res) => {
        return res.render('user/user', {
            tittle  : 'Logearse',
            site    : 'log'
        });
    },
    // POST
    loginPost: (req, res) => {

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
            req.session.userLogged = user;
            res.locals.isLogged    = true;
            if (req.body.checkRem) {
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
                console.error(err);
            })
        } else {
            return res.redirect('/user/profile')
        }

    },
    getAllUsers: (req, res) => {
        db.User.findAll({
            include: [
                {association: 'rol'}
            ]
        }).then((users) => {
            return res.status(200).json({
                users   : users,
                quantity: users.length
            })
        }).catch((err) => {
            console.error(err)
            return res.status(500).json({
                error: err
            })
        })
    },
    validationEmail: (req, res) => {
        let email = req.params.email
        db.User.findOne({
            where: {
                email: email
            }
        }).then((email) => {
            if (email) {
                return res.status(200).json({
                    found: true
                })
            } else {
                return res.status(204).json({
                    found: false
                })
            }
        })
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
        return res.render('user/user', {
            tittle:     'Registrate',
            errors: {
                email : {
                    msg: `Este ${field} ya está registrado.`
                }
            },
            oldData:    req.body,
            site:       'reg',
        });
    } else {
        return res.render('user/user', {
            tittle:     'Registrate',
            errors: {
                user : {
                    msg: `Este ${field} ya está registrado.`
                }
            },
            oldData:    req.body,
            site:       'reg',
        });
    }
}

function returnErrLog(field, req, res) {
    if (field == 'email') {
        return res.render('user/user', {
            errors: {
                email: {
                    msg: 'No se encuentra ese email.'
                }
            },
            oldData: req.body,
            tittle  : 'Logearse',
            site    : 'log'
        })
    } else {
        return res.render('user/user', {
            errors: {
                pass: {
                    msg: 'No coincide la contraseña'
                }
            },
            oldData: req.body,
            tittle  : 'Logearse',
            site    : 'log'
        })
    }
}

module.exports = userController; 