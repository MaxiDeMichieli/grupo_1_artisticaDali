const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const emailRecoverValidator = require('../validations/emailRecoverValidator');
const passRecoverValidator = require('../validations/passRecoverValidator');
const sessionUserCheck = require('../middlewares/sessionUserCheck');
const onlyVisitorCheck = require('../middlewares/onlyVisitorCheck');

const db = require('../database/models')



var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: '665948940308-ho59c0f44s9c5ccgk4aeu8r453on0jqe.apps.googleusercontent.com',
    clientSecret: 'w0OODRyj77fJgtjpdN3T4L6j',
    callbackURL: "http://localhost:3000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        console.log(profile)
       /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       }); */
       db.Users.findOrCreate({ where: { password : profile.id  },
        defaults:{
            nombre: profile.name.givenName,
            apellido: profile.name.familyName,
            password: profile.id,
            email: 'mail'
         }})
         .then(result=>{
            return done('err', result[0].dataValues)
         })
  }
));


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }), function(req,res){
      res.send('Hello')
  });

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
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
router.get('/recover/:id/:hash', onlyVisitorCheck, controller.changePassView);
router.put('/recover/:id/:hash', passRecoverValidator, controller.changePass);



module.exports = router;