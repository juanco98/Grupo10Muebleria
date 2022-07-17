const fs        = require('fs');
const path      = require('path');
const filePath  = path.resolve(__dirname, '../database/users.json');
let users       = fs.readFileSync(filePath, {encoding: 'utf-8'});
let usersArray  = JSON.parse(users);
const {validationResult} = require('express-validator');

const userController = {
    register: (req, res) => {
        return res.render('user/register', {tittle: 'Registrate'});
    },
    newRegister: (req, res) => {
        const resVal = validationResult(req);


        if (resVal.errors.length > 0) {
            if (req.file) {
                if (req.file.filename) {
                    let name = req.file.filename
                    fs.unlinkSync(path.join(__dirname, '../public/images/users', name))
                }
            }
            return res.render('user/register', {
                tittle:     'Registrate',
                errors:     resVal.mapped(),
                oldData:    req.body
            });
        }

        // cuento la cantidad de usuarios actuales, para saber el id
        let size = usersArray.length;

        // procedo a almacenar las variables para realizar el guardado
        const {
            userName,
            userLastName,
            userBornDate,
            userEmail,
            userCity,
            userState,
            userPostalCode,
            userAddress,
            userNumberAddress,
            userNumberFloor,
            userNumberApartment,
            userUser,
            userPass,
            userSeller,
        } = req.body

        userAvatar = req.files['userAvatar'][0]['filename']

        usersArray.push(
            {
                id:             size + 1,
                name:           userName,
                lastName:       userLastName,
                bornDate:       userBornDate,
                email:          userEmail,
                city:           userCity,
                state:          userState,
                postalCode:     userPostalCode,
                address:        userAddress,
                numberAddress:  userNumberAddress,
                numberFloor:    userNumberFloor,
                numberApartment:userNumberApartment,
                user:           userUser,
                pass:           userPass,
                avatar:         userAvatar,
                role:           'user',
                seller:         userSeller
            }
        )

        fs.writeFileSync(filePath, JSON.stringify(usersArray, null, ''))

        return res.redirect('user/profile');
    },
    recover: (req, res) => {
        return res.render('user/recover', {tittle: 'Recuperar'});
    },
    profile: (req, res) => {
        return res.render('user/profile', {tittle: 'Perfil'});
    }
}

module.exports = userController; 