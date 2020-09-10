const {check, validationResult, body} = require('express-validator');
const dbUsuarios = require('../data/usersDataBase');

module.exports = [
    check('nombre')
        .isLength({min:1})
        .withMessage('Debes ingresar un nombre'),
    
    check('apellido')
        .isLength({min:1})
        .withMessage('Debes ingresar un apellido'),

    check('email')
        .isEmail()
        .withMessage('Debes ingresar un email válido'),
    
    body('email')
        .custom(function(value){
            let usuario = dbUsuarios.filter(user=>{
                return user.email == value 
            })
            if(usuario == false){ 
                return true 
            }else{
                return false 
            }
        })
        .withMessage('Este email ya está registrado'),

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