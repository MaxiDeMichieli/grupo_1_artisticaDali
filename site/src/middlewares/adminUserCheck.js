const db = require('../database/models');

module.exports = (req, res, next) => {
    db.Users.findByPk(req.session.usuario.id)
        .then(user => {
            let admin = false
            if(user.rol == 1){
                admin = true
            }
            if(admin){
                next();
            }else{
                res.redirect('/')
            }
        })
        .catch(err => {
            res.redirect('/')
        })
}