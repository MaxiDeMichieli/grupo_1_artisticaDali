const express = require('express');
const router = express.Router();
const controller = require ('../controllers/productsController');
const productCreateValidator = require('../validations/productCreateValidator');
const productEditValidator = require('../validations/productEditValidator');
const upImageProduct = require('../middlewares/upImageProduct');
const sessionUserCheck = require('../middlewares/sessionUserCheck');
const adminUserCheck = require('../middlewares/adminUserCheck');



/* CARRITO */
router.get('/cart', sessionUserCheck, controller.cart);

/* CARGA DE PRODUCTO */
router.get('/create',sessionUserCheck, adminUserCheck,  controller.addProduct);
router.post('/create', upImageProduct.any(), productCreateValidator, controller.create );

/* EDICION DE PRODUCTO */
router.get('/edit',sessionUserCheck, adminUserCheck, controller.editionPage)
router.get('/searchEdit',sessionUserCheck, controller.browserToEdit)

router.get('/edit/:id',sessionUserCheck, adminUserCheck, controller.toEdit)
router.put('/edit/:id',sessionUserCheck, upImageProduct.any(), productEditValidator, controller.edit)

/* BORRAR PRODUCTO */
router.delete('/delete/:id',sessionUserCheck, controller.delete)

/* DETALLE DE PRODUCTO */
router.get('/detail/:id', controller.detail);

/* CATEGORIAS */
router.get('/category/:id', controller.categories);

/* SUBCATEGORIAS */
router.get('/subcategory/:id', controller.subcategories);

/* BUSCADOR */
router.get('/search', controller.search);



module.exports = router;