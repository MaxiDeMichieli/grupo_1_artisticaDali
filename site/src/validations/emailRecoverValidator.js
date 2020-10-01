const {check, validatorResult, body} = require('express-validator');
const dbUsers = require('../data/usersDataBase');

module.exports = [
    check('email').isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email').custom(value => {
        let result = false;
        dbUsers.forEach(user => {
            if(user.email == value){
                result = true;
            }
        });
        return result;
    })
    .withMessage('Este email no se encuentra registrado')
]