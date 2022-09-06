const db = require('../database/models');

function userNavBarLog(req, res, next) {
    // res.locals.isLogged = false;

    // let emailCookie = req.cookies.email;
    // if (emailCookie) {
    //     let userFromCookie = User.findByField('email', emailCookie);
    //     if (userFromCookie) {
    //         delete userFromCookie.pass;
    //         delete userFromCookie.pass2;
    //         req.session.userLogged = userFromCookie;
    //     }
    // }

    // if (req.session && req.session.userLogged) {
    //     res.locals.isLogged     = true;
    //     res.locals.userLogged   = req.session.userLogged
    // }

    res.locals.isLogged = false;
    let emailCookie = req.cookies.email;
    if (emailCookie) {
        db.User.findOne({
            where: {
                email: emailCookie
            }
        }).then((data) => {
            delete data.pass;
            delete data.pass2;
            req.session.userLogged = data;
        }).then(() => {
            if (req.session && req.session.userLogged) {
                res.locals.isLogged     = true;
                res.locals.userLogged   = req.session.userLogged
            }
        }).then(() => {
            next()
        }).catch((e) => {
            console.error(e);
        })
    }



    // next();
}

module.exports = userNavBarLog;