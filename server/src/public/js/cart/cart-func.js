window.addEventListener('load', function() {

    if (document.querySelector('#idModel')) {
        let idModel = document.querySelector('#idModel').value;
        if (idModel) {
            let cartBtn = document.querySelector('.cart-btn');
            if (cartBtn) {
                cartBtn.addEventListener('click', function(e) {
                    if (!localStorage.getItem("cart")) {
                        localStorage.setItem("cart", JSON.stringify(idModel))
                    } else {
                        let arrCart = JSON.parse(localStorage.getItem('cart'))
                        if (!arrCart.includes(idModel)) {
                            arrCart.push(idModel);
                            localStorage.setItem("cart", JSON.stringify(items))
                        }
                    }
                })
            }
        }
    }

    let mainCart = document.querySelector('.mainCart');
    if (mainCart) {
        if (localStorage.getItem("cart")) {
            
            let settings = {
                'method' : 'POST',
                'body' : localStorage.getItem('cart')
            }

            let url = this.location.protocol+'//'+this.location.host+'/products/modelsForCart';
            // let url = this.location.protocol+'//'+this.location.host+'/products/modelsForCart/'+localStorage.getItem('cart');

            fetch(url, settings)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
        
            
        }
    }


})