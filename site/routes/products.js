const express = require('express');
const router = express.Router();
const controller = require ('../controllers/productsController');

/* CARRITO */
router.get('/cart', controller.cart);

/* CARGA DE PRODUCTO */
router.get('/create', controller.addProduct);

/* DETALLE DE PRODUCTO */
router.get('/detail/:id', controller.detail);

/* CATEGORIAS */
router.get('/category/:id', controller.categories);

/* BUSCADOR */
router.get('/search', controller.search);






module.exports = router;

