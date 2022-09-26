window.addEventListener('load', function() {

    let form = document.forms['formNewProduct']
    form.addEventListener("submit", function(e) {
        let errors = [];

        let productName = document.querySelector("#productName")
        let productDesc = document.querySelector("#productDesc")
        if (productName.value === '') {
            errors.push('Nombre vacio');
        }
        if (productName.length <= 5) {
            errors.push('Faltan caracteres');
        }
        if (productDesc.length <= 20) {
            errors.push('Faltan caracteres');
        }

        if (errors.length > 0) {
            e.preventDefault();
            let ulErr = document.querySelector('.error ul');
            errors.forEach(error => {
                ulErr.innerHTML += `<li>${error}</li>`
            })
        }

    })

})