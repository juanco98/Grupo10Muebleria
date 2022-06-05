const mainController = {
    home: (req, res) => {
        res.render('home/home', {tittle: null})
    },
    aboutUs: (req, res) => {
        res.render('aboutus/aboutus', {tittle: 'Sobre Nosotros'})
    },
    contact: (req, res) => {
        res.render('contact/contact', {tittle: 'Contacto'})
    }
}

module.exports = mainController; 