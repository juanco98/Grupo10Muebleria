function userNotLogged(req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/');
    }
    res.locals.isLogged = true;
    next();
}

module.exports = userNotLogged;