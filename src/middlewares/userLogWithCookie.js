const db = require('../database/models');

function userLogWithCookie(req, res, next) {


    res.locals.isLogged = false;
    let emailInCookie = req.cookies.email;
    if (emailInCookie) {
        db.User.findOne({
            where: {
                email: emailInCookie
            }
        }).then((user) => {
            req.session.userLogged = user
            if (req.session.userLogged) {
                res.locals.isLogged     = true;
                res.locals.userLogged   = req.session.userLogged
            }
        }).then(() => {
            next()
        })
    } else {
        if (req.session.userLogged) {
            res.locals.isLogged     = true;
            res.locals.userLogged   = req.session.userLogged
        }
        next()
    }
    

    // next()
    
    // res.locals.isLogged = false;
    // if (req.locals) {
    //     if (req.locals.userLogged) {
    //         res.locals.isLogged = true;
    //     }
    // }
    // let emailCookie = req.cookies.email;
    // if (emailCookie) {
    //     db.User.findOne({
    //         where: {
    //             email: emailCookie
    //         }
    //     }).then((data) => {
    //         res.locals.isLogged     = true;
    //         res.locals.userLogged   = data
    //         next()
    //     }).catch((e) => {
    //         console.error(e);
    //     })
    // } else {
    //     next();
    // }

}

module.exports = userLogWithCookie;