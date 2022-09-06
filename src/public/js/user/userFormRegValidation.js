window.addEventListener('load', function() {

    let form = document.forms['formUserReg']
    form.addEventListener("submit", function(e) {

        let errors = [];

        e.preventDefault();
        var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

        let name = document.querySelector("#name")
        let lastName = document.querySelector("#lastName")
        let email = document.querySelector("#email")
        let pass = document.querySelector("#pass")
        if (name.value === '') {
            errors.push('Nombre vacio');
        }
        if (name.length <= 2) {
            errors.push('Faltan caracteres');
        }
        if (lastName.value === '') {
            errors.push('Apellido vacio');
        }
        if (lastName.length <= 2) {
            errors.push('Faltan caracteres');
        }
        if (email.value === '') {
            errors.push('Email vacio');
        }
        if (email.value.match(emailPattern)) {
            errors.push('Email invalido');
        }
        if (pass.value === '') {
            errors.push('Contraseña vacia');
        }
        if (pass.length <= 8) {
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