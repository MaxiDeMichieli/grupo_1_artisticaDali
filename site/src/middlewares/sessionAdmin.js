const dbUsers = require('../data/usersDataBase')

module.exports = (req, res, next) => {
    if(req.session.usuario && !req.session.admin){
        dbUsers.forEach(user => {
            if(req.session.usuario.id == user.id && user.admin == true){
                req.session.admin = true;
            }
        })
    }
    next();
}