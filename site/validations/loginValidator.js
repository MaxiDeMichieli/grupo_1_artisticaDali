const {check,validationResult,body} = require('express-validator');
const bcrypt = require('bcrypt');
const dbUsuarios = require('../data/usersDataBase');

module.exports = [
    check('email')
        .isLength({min:1})
        .withMessage('Debes ingresar un email')
        .isEmail()
        .withMessage('Debes ingresar un email válido'),

    check('password')
        .isLength({min:1})
        .withMessage('Debes ingresar una contraseña'),

    body('custom')
        .custom((value, {req})=> {
            let result = false;

            dbUsuarios.forEach(user => {
                if(user.email == req.body.email){
                    result = true;
                    if(!bcrypt.compareSync(req.body.password ,user.password)){
                        result = false
                    }
                }
            });

            return result
        })
        .withMessage('Usuario o contraseña incorrectos')
]