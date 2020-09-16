module.exports = function userAdmin(req,res,next){
    if(req.session.usuario.usuario == 'admin'){
        next()
    }else{
        res.redirect('/users/login')
    }
}