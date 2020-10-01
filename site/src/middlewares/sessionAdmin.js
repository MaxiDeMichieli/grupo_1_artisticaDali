const db = require('../database/models');

module.exports = (req, res, next) => {
    console.log(req.session.admin)
    if(req.session.usuario && !req.session.admin){
        db.Users.findByPk(req.session.usuario.id)
            .then(user => {
                if(user.rol == 1){
                    req.session.admin = true;
                }
                next();
            })
    }else{
        next();
    }
}