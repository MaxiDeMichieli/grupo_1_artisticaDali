const db = require('../database/models');

module.exports = (req, res, next) => {
    let pedido = () => {
        db.Carts.findAll({
            where: {
                usuario_id: req.session.usuario.id
            }
        })
        .then(result => {
            res.locals.cart = result.length;
            next()
        })
        .catch(err => {
            res.locals.cart = 0;
            next()
        })
    }

    if (req.session.usuario) {
        pedido()
    } else {
        res.locals.cart = 0
        next()
    }
}