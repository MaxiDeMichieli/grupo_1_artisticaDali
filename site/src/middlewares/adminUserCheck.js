const dbUsers = require('../data/usersDataBase');

module.exports = (req, res, next) => {
    let admin = false;

    dbUsers.forEach(user => {
        if(req.session.usuario.id == user.id){
            if(user.admin){
                admin = true;
            }
        }
    })

    if(admin){
        next();
    }else{
        res.redirect('/')
    }
}