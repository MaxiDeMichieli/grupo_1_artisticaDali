const db = require('../database/models')
const dbProduct = require('../data/dataBase.js');

module.exports = {
    home:(req, res, next) =>{
        db.Products.findAll({include:[{association:'imagenes'}]})
        .then(function(productos){
            res.render('index', { 
            title: 'Artística Dalí',
            session: req.session,
            subcategories: req.subcategories,
            productos: productos,
            imagen:productos
        });
    })
    },
}
