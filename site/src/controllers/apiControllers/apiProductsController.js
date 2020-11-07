const db = require('../../database/models');

module.exports = {
    subcategories: (req, res) => {
        let categoriaId = req.params.category;

        db.Categories.findOne({
            where: {
                id: categoriaId
            },
            include: [
                {association: 'subcategorias'}
            ]
        })
        .then(resultado => {
            res.json(resultado)
        })
    },
    addCart: (req, res) => {
        let producto = req.params.prod;
        let cantidad = parseInt(req.params.cantidad);

        if(!req.session.usuario){
            res.json({visitor: true});
        } else {
            db.Carts.findOne({
                where: {
                    usuario_id: req.session.usuario.id,
                    producto_id: producto
                }
            })
            .then(result => {
                console.log(result)
                if(result == null) {
                    db.Carts.create({
                        usuario_id: req.session.usuario.id,
                        producto_id: producto,
                        cantidad: cantidad
                    })
                    .then(resultado => {
                        res.json(resultado);
                    })  
                    .catch(err => {
                        res.json(err);
                    })
                } else {
                    db.Carts.update({
                        cantidad: result.dataValues.cantidad + cantidad
                    }, {
                        where: {
                            usuario_id: req.session.usuario.id,
                            producto_id: producto,
                        }
                    })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(err => {
                        res.json(err)
                    })
                }
            })
        }
    },
    removeCart: (req, res) => {
        let producto = req.params.prod;

        db.Carts.destroy({
            where: {
                producto_id: producto,
                usuario_id: req.session.usuario.id
            }
        })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json(err)
        })
    },
    cartProducts: (req, res) => {
        db.Carts.findAll({
            where: {
                usuario_id: req.session.usuario.id
            },
            include: [{association: 'producto',
                include: [{association: 'imagenes'}]
            }]
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    },
    cartCantidad: (req, res) => {
        let cantidad = req.params.cant;
        let producto = req.params.prod;

        db.Carts.update({
            cantidad: cantidad
        }, {
            where: {
                producto_id: producto
            }
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    }
}