function userLogged(req, res, next) {
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        return res.redirect('/user/profile');
    }
    next();
}

module.exports = userLogged;