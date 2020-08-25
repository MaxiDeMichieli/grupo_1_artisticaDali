var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController')

/* GET users listing. */
router.get('/account', controller.account);
router.delete('/account/delete', controller.delete);

router.get('/account/edit', controller.editView);
router.put('/account/edit', controller.edit)

router.get('/login', controller.registerView);
router.post('/login/create', controller.register)

module.exports = router;
