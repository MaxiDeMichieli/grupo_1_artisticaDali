const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

/* USER ACCOUNT */
router.get('/account', controller.account);
router.delete('/account/delete', controller.delete);

/* USER EDIT */
router.get('/account/edit', controller.editView);
router.put('/account/edit', controller.edit)

/* USER LOGIN AND REGISTER */
router.get('/login', controller.registerView);
router.post('/login', loginValidator, controller.login);
router.post('/register', registerValidator, controller.register)

module.exports = router;
