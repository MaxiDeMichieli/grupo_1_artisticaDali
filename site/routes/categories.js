const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController'

/* GET categories (Escolar, Artística, Oficina) */)
router.get('/:id', categoriesController.categories)

module.exports = router;