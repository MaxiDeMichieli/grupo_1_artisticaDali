const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.home );

/* GET contact page. */
router.get('/contact', indexController.contact);

router.post('/contact',  indexController.formEmail);


module.exports = router;