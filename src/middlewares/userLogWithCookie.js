const db = require('../database/models');

function userLogWithCookie(req, res, next) {

    res.locals.isLogged = false;
    let emailCookie = req.cookies.email;
    if (emailCookie) {
        db.User.findOne({
            where: {
                email: emailCookie
            }
        }).then((data) => {
            req.session.userLogged = data;
            console.log(req.session.userLogged);
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
    } else {
        next();
    }

}

module.exports = userLogWithCookie;