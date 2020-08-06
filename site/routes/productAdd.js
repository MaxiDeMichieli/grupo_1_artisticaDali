const express = require('express');
const router = express.Router();
const productAddController = require('../controllers/productAddController');

/* GET Product Add Form. */

router.get('/', productAddController.addProduct);

module.exports = router;