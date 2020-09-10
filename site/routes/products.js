const express = require('express');
const router = express.Router();
const controller = require ('../controllers/productsController');
const multer = require('multer');
const path = require('path');
const { addProduct } = require('../controllers/productsController');
const productCreateValidator = require('../validations/productCreateValidator');
const productEditValidator = require('../validations/productEditValidator')


let storage = multer.diskStorage({
    destination:(req, file, callback)=>{
    callback(null, 'public/images/productos')
    },
    filename:(req, file, callback)=>{
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage});

/* CARRITO */
router.get('/cart', controller.cart);

/* CARGA DE PRODUCTO */
router.get('/create', controller.addProduct);

router.post('/create', upload.any(), productCreateValidator, controller.create );

/* EDICION DE PRODUCTO */

router.get('/edit', controller.editionPage)
router.get('/searchEdit', controller.browserToEdit)

router.get('/edit/:id', controller.toEdit)
router.put('/edit/:id', upload.any(),productEditValidator,  controller.edit)

router.delete('/delete/:id', controller.delete)

/* DETALLE DE PRODUCTO */
router.get('/detail/:id', controller.detail);

/* CATEGORIAS */
router.get('/category/:id', controller.categories);

/* SUBCATEGORIAS */
router.get('/subcategory/:id', controller.subcategories);

/* BUSCADOR */
router.get('/search', controller.search);






module.exports = router;

