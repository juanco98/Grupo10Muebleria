const path = require ("path");

const userController = {
    register: (req, res) => {
        res.render('register/form');
    }
}

module.exports = userController; 