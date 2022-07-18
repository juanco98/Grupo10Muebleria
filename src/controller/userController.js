const fs        = require('fs');
const path      = require('path');

const {validationResult}    = require('express-validator');
const bcryptjs              = require('bcryptjs');
const User                  = require('../models/User');

const userController = {
    register: (req, res) => {
        return res.render('user/register', {tittle: 'Registrate'});
    },
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
    recover: (req, res) => {
        return res.render('user/recover', {tittle: 'Recuperar'});
    },
    profile: (req, res) => {
        console.log(req.cookies.email)
        return res.render('user/profile', {
            tittle: 'Perfil',
            user:   req.session.userLogged
        });
    },
    login: (req, res) => {
        let userLog = User.findByField('email', req.body.email);

        if(!userLog) {
            returnErrLog('email', req, res);
            res.redirect('/')
            throw new Error("email no existe");
        } else {
            let okPass = bcryptjs.compareSync(req.body.pass, userLog.pass)
            if (!okPass) {
                returnErrLog('pass', req, res);
                res.redirect('/')
                throw new Error("pass no existe");
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
    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
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
        res.render('home/home', {
            errors: {
                email: {
                    msg: 'No se encuentra ese email.'
                }
            },
            oldData: req.body,
            tittle: null
        })
    } else {
        res.render('home/home', {
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