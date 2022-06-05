const mainController = {
    home: (req, res) => {
        res.render('home/home')
    },
    aboutUs: (req, res) => {
        res.render('aboutus/aboutus')
    },
    contact: (req, res) => {
        res.render('contact/contact')
    }
}

module.exports = mainController; 