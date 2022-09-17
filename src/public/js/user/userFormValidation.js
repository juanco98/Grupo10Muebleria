window.addEventListener('load', function() {
    let formLog = document.forms['formUserLog']
    if (formLog) {
        formLog.addEventListener("submit", function(e) {

            let errors = [];

            var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

            let email = document.getElementById("#email")
            let pass = document.getElementById("#pass")
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
                ulErr.innerHTML = ''
                errors.forEach(error => {
                    ulErr.innerHTML += `<li>${error}</li>`
                })
            }
    
        })
    }

    let formReg = document.forms['formUserReg']
    if (formReg) {
        formReg.addEventListener("submit", function(e) {
            console.log('hola');
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
                ulErr.innerHTML = ''
                errors.forEach(error => {
                    ulErr.innerHTML += `<li>${error}</li>`
                })
            }

        })
    }

})