const {check, validatorResult, body} = require('express-validator')

module.exports = [
    body('category').custom(function(value){
        if (value == '0') {
            return false
        }else{
            return true
        }
    })
    .withMessage('Debes elegir una categoría'),

    check('subcategory')
    .isLength({
        min:1
    })
    .withMessage('Debes ingresar una subcategoría distinta, o mantiene el mismo valor'),
    
    check('name')
    .isLength({min:1})
    .withMessage('Debes ingresar un nombre de producto nuevo o mantener el existente'),

    check('price')
    .isLength({min:1}).withMessage('Debes ingresar el precio al producto o mantener el existente'),
]