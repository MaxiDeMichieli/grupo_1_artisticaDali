const dbUsers = require('../data/usersDataBase');

module.exports = (req, res, next) => {
    dbUsers.forEach(user => {
        if(req.session.usuario.id == user.id){
            if(user.admin){
                next();
            }
        }
    })

    res.redirect('/')
}