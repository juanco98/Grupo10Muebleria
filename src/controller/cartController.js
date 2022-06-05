const cartController = {
    detailCart: (req, res) => {
        res.render('cart/cart', {tittle: 'Detalle Carrito'})
    }
}

module.exports = cartController; 