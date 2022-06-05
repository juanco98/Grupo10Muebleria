const userController = {
    register: (req, res) => {
        res.render('user/register', {tittle: 'Registrate'});
    }
}

module.exports = userController; 