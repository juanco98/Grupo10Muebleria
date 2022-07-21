const User = require('../models/User')

function userNavBarLog(req, res, next) {
    res.locals.isLogged = false;

    let emailCookie = req.cookies.email;
    if (emailCookie) {
        let userFromCookie = User.findByField('email', emailCookie);
        if (userFromCookie) {
            delete userFromCookie.pass;
            delete userFromCookie.pass2;
            req.session.userLogged = userFromCookie;
        }
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLogged     = true;
        res.locals.userLogged   = req.session.userLogged
    }
    
    next();
}

module.exports = userNavBarLog;