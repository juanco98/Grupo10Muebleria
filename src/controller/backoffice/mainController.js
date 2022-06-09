const mainController = {
    home0: (req, res) => {
        res.redirect('/admin/connect');
    },
    home: (req, res) => {
        res.render('backoffice/home/home', {tittle: 'Home'})
    },
    connect: (req, res) => {
        res.render('backoffice/home/connect', {tittle: 'Conectarse'})
    }
}

module.exports = mainController; 