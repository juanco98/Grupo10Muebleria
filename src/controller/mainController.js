const mainController = {
    home: (req, res) => {
        return res.render('home/home', {tittle: null})
    },
    aboutUs: (req, res) => {
        return res.render('aboutus/aboutus', {tittle: 'Sobre Nosotros'})
    },
    contact: (req, res) => {
        return res.render('contact/contact', {tittle: 'Contacto'})
    }
}

module.exports = mainController; 