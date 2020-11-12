const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../database/models')


module.exports = () => {
    return(
        passport.use(
            new GoogleStrategy({
                clientID: '665948940308-ho59c0f44s9c5ccgk4aeu8r453on0jqe.apps.googleusercontent.com',
                clientSecret: 'w0OODRyj77fJgtjpdN3T4L6j',
                callbackURL: "http://localhost:3000/users/auth/google/callback"
            },
            function(accessToken, refreshToken, profile, done) {
                db.Users.findOrCreate({
                    where: {
                        social_id: profile.id
                    },
                    defaults:{
                        nombre: profile.name.givenName,
                        apellido: profile.name.familyName,
                        email: profile.emails[0].value,
                        password: null,
                        rol: 0,
                        social_id: profile.id,
                        social_provider: 'google'
                    }
                })
                .then(usuario =>{
                    return done(null, usuario)
                })
                .catch(error=>{
                    console.log(error)
                })
            }
            )
        )
    )
}