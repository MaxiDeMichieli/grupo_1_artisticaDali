const db = require('../database/models');
const bcrypt = require('bcrypt')

module.exports = (req, res, next) => {
    if(req.cookies.userArtisticaDali && !req.session.usuario){
        db.Users.findOne({
            where: {
                email:req.cookies.userArtisticaDali.email,
                id: req.cookies.userArtisticaDali.id
            }
        })
            .then(user => {
                if(bcrypt.compareSync(user.password, req.cookies.userArtisticaDali.hash)){
                    req.session.usuario = req.cookies.userArtisticaDali;
                }
                next();
            })
    }else{
        next()
    }
}