const cartController = {
    detailCart: (req, res) => {
        return res.render('cart/cart', {tittle: 'Detalle Carrito'})
    }
}

module.exports = cartController; 