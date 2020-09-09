const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

/* GET users listing. */
router.get('/account', controller.account);
router.delete('/account/delete', controller.delete);

router.get('/account/edit', controller.editView);
router.put('/account/edit', controller.edit)

router.get('/login', controller.registerView);
router.post('/login', loginValidator, controller.login);
router.post('/login/create', registerValidator, controller.register)

module.exports = router;
