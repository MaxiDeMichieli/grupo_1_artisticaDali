const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const sessionUserCheck = require('../middlewares/sessionUserCheck');
const onlyVisitorCheck = require('../middlewares/onlyVisitorCheck');

/* USER ACCOUNT */
router.get('/account', sessionUserCheck, controller.account);
router.delete('/account/delete', controller.delete);

/* USER EDIT */
router.get('/account/edit', sessionUserCheck, controller.editView);
router.put('/account/edit', controller.edit)

/* USER LOGIN AND REGISTER */
router.get('/login/:id?', onlyVisitorCheck, controller.registerView);
router.post('/login', loginValidator, controller.login);
router.post('/register', registerValidator, controller.register)

/* LOGOUT */
router.get('/logout', sessionUserCheck, controller.logout)


module.exports = router;