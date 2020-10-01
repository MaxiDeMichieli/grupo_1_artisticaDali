const {check, validatorResult, body} = require('express-validator')

module.exports = [
    check('subcategory').isLength({min:1})
    .withMessage('Debes ingresar una subcategoría'),

    body('category').custom(function(value){
        if (value == '0') {
            return false
        }else{
            return true
        }
    })
    .withMessage('Debes elegir una categoría'),
    
    check('name')
    .isLength({min:1})
    .withMessage('Debes ingresar una nombre de producto'),

    check('price')
    .isLength({min:1}).withMessage('Debes ingresar el precio del producto')
]