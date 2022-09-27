window.addEventListener('load', function() {

    let formLog = document.forms['formUserLog']
    formLog.addEventListener("submit", function(e) {

        let errors = [];

        var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

        const formulario = document.getElementById('formUserReg');
        const inputs = document.querySelectorAll('#formLog input')

        const expresiones ={
            usuario: /^[a-zA - Z0-9\_\-]{4,16}$/, /*letras, numeros, guion y gion_bajo*/
            nombre: /^[a-zA-AÁ - ÿ\s]{1,40}$/,//Letras y espacios, pueden llevar acentos
            pass: /^.{1,40}$/, //de 4 a 12 digitos
            correo: /^[a-zA - Z0-9\_\-]+@[a-zA - Z0-9-]+[a-zA - Z0-9-]+$/,
        }
        const campos = {
            usuario:false,
            nombre:false,
            pass:false,
            correo:false,
        }

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
            errors.forEach(error => {
                ulErr.innerHTML += `<li>${error}</li>`
            })
        }

    })
    const validarFormulario = (e) =>{
       switch(e.target.name){
        case "Nombre":
            validarCampo(expresiones.nombre,e.target,'nombre');
        break;
        case "Apellido":
            validarCampo(expresiones.apellido,e.target,'apellido');
        break;
        case "Email":
            validarCampo(expresiones.correo,e.target,'correo');
            break;
        case "Usuario":
            validarCampo(expresiones.usuario,e.target,'usuario');
            break;
        case "pass":
            validarCampo(expresiones.password,e.target,'password');
            validadpassword2();
            break;
        case "pass2":
            validadpassword2();
            break;
        
       }
       
       
    }
    const validarCampo = (expresion,input,campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`${campo}`).classList.remove('form-up-incorrecto');
            document.getElementById(`${campo}`).classList.add('form-up-correcto');
            document.querySelector(`${campo} i`).classList.remove('fa-solid fa-circle-xmark');
            document.querySelector(`${campo} i`).classList.add('fa-solid fa-circle-check');
            document.querySelector(`${campo} .formulario__validacion-error`).classList.remove('formulario__validacion-error-activo');
            campos[campo] = true;

        } else{
            document.getElementById(`${campo}`).classList.add('form-up-incorrecto');
            document.getElementById(`${campo}`).classList.remove('form-up-correcto');
            document.querySelector(`${campo} i `).classList.remove('fa-solid fa-circle-check');
            document.querySelector(`${campo} i `).classList.add('fa-solid fa-circle-xmark');
            document.querySelector(`${campo} .formulario__validacion-error`).classList.add('formulario__validacion-error-activo');
            campos[campo] = false;
        }
    }
    const validadpassword2 = () =>{
        const inputPassword1 = document.getElementById('´pass');
        const inputPassword2 = document.getElementById('´pass2');

        if(inputPassword1.value !== inputPassword2.value){
            document.getElementById(`pass2`).classList.add('form-up-incorrecto');
            document.getElementById(`pass2`).classList.remove('form-up-correcto');
            document.querySelector(`pass2 i `).classList.remove('fa-solid fa-circle-check');
            document.querySelector(`pass2 i `).classList.add('fa-solid fa-circle-xmark');
            document.querySelector(`pass2 .formulario__validacion-error`).classList.add('formulario__validacion-error-activo');
            campos[pass] = false;
        }else{
            document.getElementById(`pass2`).classList.remove('form-up-incorrecto');
            document.getElementById(`pass2`).classList.add('form-up-correcto');
            document.querySelector(`pass2 i `).classList.remove('fa-solid fa-circle-check');
            document.querySelector(`pass2 i `).classList.add('fa-solid fa-circle-xmark');
            document.querySelector(`pass2 .formulario__validacion-error`).classList.remove('formulario__validacion-error-activo');
            campos[pass] = true;
        }
    }

    inputs.forEach((input)=>{
        input.addEventListener('keyup',validarFormulario);
        input.addEventListener('blur',validarFormulario);
    });

    let formReg = document.forms['formUserReg']
    formReg.addEventListener("submit", function(e) {

        if(campos.usuario && campos.nombre,campos.pass,campos.correo){
            formLog.reset();

            document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
            setTimeout(() =>{
                document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
            },5000);

            document.querySelectorAll('.formLog-correcto').forEach((icono) =>{
                icono.classList.remove('formLog-correcto');
            })
        }else{
            document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
        }

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