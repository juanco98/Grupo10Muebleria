const mainController = {
    home0: (req, res) => {
        return res.redirect('/admin/connect');
    },
    home: (req, res) => {
        return res.render('backoffice/home/home', {tittle: 'Home'})
    },
    connect: (req, res) => {
        return res.render('backoffice/home/connect', {tittle: 'Conectarse'})
    }
}

module.exports = mainController; 