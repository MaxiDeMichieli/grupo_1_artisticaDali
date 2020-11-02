const express = require('express');
const router = express.Router();
const controller = require ('../../controllers/apiControllers/apiProductsController');

router.get('/:category/subcategories', controller.subcategories);

router.post('/addCart/:prod/:cantidad', controller.addCart);

router.post('/removeCart/:prod', controller.removeCart);

router.get('/cartProducts', controller.cartProducts);

router.post('/qtyCart/:prod/:cant', controller.cartCantidad);

module.exports = router;