const dbUser = require('../data/usersDataBase');
const bcrypt = require('bcrypt')

module.exports = (req, res, next) => {
    if(req.cookies.userArtisticaDali){
        dbUser.forEach(user => {
            if(req.cookies.userArtisticaDali.email == user.email && req.cookies.userArtisticaDali.id == user.id){
                if(bcrypt.compareSync(user.password, req.cookies.userArtisticaDali.hash)){
                    req.session.usuario = req.cookies.userArtisticaDali;
                }
            }
        })
    }
    next();
}