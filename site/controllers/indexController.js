const dbProduct = require('../data/dataBase.js');

module.exports = {
    home:(req, res, next) =>{
        res.render('index', { 
            title: 'Artística Dalí',
            subcategories: req.subcategories,
            productos: dbProduct
        });
    },
}
