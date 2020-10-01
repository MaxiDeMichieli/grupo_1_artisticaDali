const {check, validatorResult, body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('email').isEmail()
        .withMessage('Debes ingresar un email válido'),

    body('email')
        .custom(function(value){
            return db.Users.findOne({
                where:{
                    email:value
                }
            })
            .then(user => {
                console.log('encontrado')
                if(!user){
                    console.log('encontrado pero no')
                    return Promise.reject('Este email no se encuentra registrado')
                }
            })
        }),
]