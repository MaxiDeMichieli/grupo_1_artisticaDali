const {check, validationResult, body} = require('express-validator');

module.exports = [
    check('password')
        .isLength({min:6, max:100})
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('passwordRepeat')
        .custom(function(value,{req}){
            if(value != req.body.password){
                return false
            }
            return true
        })
        .withMessage('Las contraseñas no coinciden')
]