const express = require('express');
const router = express.Router();
const controller = require ('../../controllers/apiControllers/apiProductsController');
const productCreateValidator = require('../../validations/productCreateValidator');
const productEditValidator = require('../../validations/productEditValidator');
const upImageProduct = require('../../middlewares/upImageProduct');
const sessionUserCheck = require('../../middlewares/sessionUserCheck');
const adminUserCheck = require('../../middlewares/adminUserCheck');

router.get('/:category/subcategories', controller.subcategories)

module.exports = router;