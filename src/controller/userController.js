const userController = {
    register: (req, res) => {
        res.render('user/register', {tittle: 'Registrate'});
    },
    newRegister: (req, res) => {
        res.send(req.body);
    },
    recover: (req, res) => {
        res.render('user/recover', {tittle: 'Recuperar'});
    },
}

module.exports = userController; 