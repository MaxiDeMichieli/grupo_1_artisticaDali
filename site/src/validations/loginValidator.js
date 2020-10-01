const {check,validationResult,body} = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models')

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
            return db.Users.findOne({
                where:{
                    email: req.body.email
                }
            })
            .then(user => {
                if(!bcrypt.compareSync(req.body.password, user.dataValues.password)){
                    return Promise.reject()
                }
            })
            .catch((err) => {
                return Promise.reject("Email o contraseña incorrectos")
            })
        })
]