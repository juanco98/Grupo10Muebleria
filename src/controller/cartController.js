const cartController = {
    detailCart: (req, res) => {
        return res.render('cart/cart', {tittle: 'Detalle Carrito'})
    },
    addModelToCart: (req, res) => {
        let arrIdModelsCart = []
        arrIdModelsCart.push(req.params.modelId)
        req.session.cart = arrIdModelsCart;
        res.redirect('/products/detailProduct/'+req.params.modelId)
    }
}

module.exports = cartController; 