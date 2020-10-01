const dbProduct = require('../data/dataBase.js');

module.exports = {
    home:(req, res, next) =>{
        res.render('index', { 
            title: 'Artística Dalí',
            session: req.session,
            subcategories: req.subcategories,
            productos: dbProduct
        });
    },
}
