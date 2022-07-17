const {body}    = require('express-validator');
const path      = require('path');

const validation = [
    body('userName').notEmpty().withMessage('Tienes que ingresar un nombre válido.'),
    body('userLastName').notEmpty().withMessage('Tienes que ingresar un apellido válido.'),
    body('userBornDate').notEmpty().withMessage('Tienes que ingresar una fecha de nacimiento válida.'),
    body('userEmail').notEmpty().withMessage('Tienes que ingresar un email válido.').bail()
                    .isEmail().withMessage('Tienes que ingresar un email válido.'),
    body('userCity').notEmpty().withMessage('Tienes que ingresar una ciudad válida.'),
    body('userState').notEmpty().withMessage('Tienes que ingresar una provincia válida.'),
    body('userPostalCode').notEmpty().withMessage('Tienes que ingresar un código postal válido.'),
    body('userAddress').notEmpty().withMessage('Tienes que ingresar una dirección válida.'),
    body('userNumberAddress').notEmpty().withMessage('Tienes que ingresar una altura válida.'),
    body('userNumberFloor').notEmpty().withMessage('Tienes que ingresar un piso válido.'),
    body('userNumberApartment').notEmpty().withMessage('Tienes que ingresar un número válido.'),
    body('userUser').notEmpty().withMessage('Tienes que ingresar un usuario válido.'),
    body('userPass').notEmpty().withMessage('Tienes que ingresar una contraseña válida.'),
    body('userPass2').custom((value, { req }) => {
        if (value !== req.body.userPass) throw new Error('La contraseña no coincide');
        return true;
      }),
    body('userAvatar').custom((value, {req}) => {
        let okExt   = ['.jpg', '.png', '.jpeg'];
        console.log(req.file);
        if (typeof req.file == 'undefined') {
            throw new Error('Tienes que subir una imagen de formatos tipo JPG, JPEG y PNG');
        } else if (req.file.originalname) {
            let fileExt = path.extname(req.file.originalname);
            if (!okExt.includes(fileExt)) throw new Error('Tienes que subir una imagen de formatos tipo JPG, JPEG y PNG');
        }
        return true;
    }),
]

module.exports = validation;