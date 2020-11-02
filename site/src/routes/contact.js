const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController')
const contactValidator = require('../validations/contactValidator')


/* GET contact page. */
router.get('/', contactController.contact );

router.post('/', /* contactValidator, */  contactController.formEmail)

module.exports = router;