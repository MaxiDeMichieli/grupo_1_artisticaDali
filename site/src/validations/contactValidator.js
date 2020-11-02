const {check, validationResult, body} = require('express-validator');

module.exports = [

    check('nombre')
    .isLength({min:1})
    .withMessage('Ingrese su nombre y apellido, por favor.'),

    check('telefono')
    .isLength({min:1})
    .withMessage('Ingrese su número de teléfono, por favor.'),

    check('email')
        .isLength({min:1})
        .withMessage('Debes ingresar un email')
        .isEmail()
        .withMessage('Debes ingresar un email válido'),

    check('consulta')
        .isLength({min:1})
        .withMessage('Envíe su consulta o el motivo por el cual quiere contactarnos.')


]