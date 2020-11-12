const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const emailRecoverValidator = require('../validations/emailRecoverValidator');
const passRecoverValidator = require('../validations/passRecoverValidator');
const sessionUserCheck = require('../middlewares/sessionUserCheck');
const onlyVisitorCheck = require('../middlewares/onlyVisitorCheck');
const passport = require('passport');
const googleLogin = require('../functions/googleLogin');
googleLogin()

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

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
router.get('/logout', sessionUserCheck, controller.logout);

/* RECOVER PASSWORD */
router.get('/recover', onlyVisitorCheck, controller.recoverView);
router.post('/recover', emailRecoverValidator, controller.sendEmail);
router.get('/recover/sent/:id', onlyVisitorCheck, controller.sentView);
router.get('/recover/change/:id/:hash', onlyVisitorCheck, controller.changePassView);
router.put('/recover/change/:id/:hash', passRecoverValidator, controller.changePass);

/* GOOGLE LOGIN */
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/login' }), controller.loginGoogle);

module.exports = router;