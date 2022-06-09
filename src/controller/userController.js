const userController = {
    register: (req, res) => {
        res.render('user/register', {tittle: 'Registrate'});
    },
    recover: (req, res) => {
        res.render('user/recover', {tittle: 'Recuperar'});
    },
}

module.exports = userController; 