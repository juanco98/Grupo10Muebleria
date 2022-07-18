const {body}    = require('express-validator');
const path      = require('path');

const validation = [
    body('name').notEmpty().withMessage('Tienes que ingresar un nombre válido.'),
    body('lastName').notEmpty().withMessage('Tienes que ingresar un apellido válido.'),
    body('bornDate').notEmpty().withMessage('Tienes que ingresar una fecha de nacimiento válida.'),
    body('email').notEmpty().withMessage('Tienes que ingresar un email válido.').bail()
                    .isEmail().withMessage('Tienes que ingresar un email válido.'),
    body('city').notEmpty().withMessage('Tienes que ingresar una ciudad válida.'),
    body('state').notEmpty().withMessage('Tienes que ingresar una provincia válida.'),
    body('postalCode').notEmpty().withMessage('Tienes que ingresar un código postal válido.'),
    body('address').notEmpty().withMessage('Tienes que ingresar una dirección válida.'),
    body('numberAddress').notEmpty().withMessage('Tienes que ingresar una altura válida.'),
    body('numberFloor').notEmpty().withMessage('Tienes que ingresar un piso válido.'),
    body('numberApartment').notEmpty().withMessage('Tienes que ingresar un número válido.'),
    body('user').notEmpty().withMessage('Tienes que ingresar un usuario válido.'),
    body('pass').notEmpty().withMessage('Tienes que ingresar una contraseña válida.'),
    body('pass2').custom((value, { req }) => {
        if (value !== req.body.pass) throw new Error('La contraseña no coincide');
        return true;
      }),
    body('avatar').custom((value, {req}) => {
        let okExt   = ['.jpg', '.png', '.jpeg'];
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