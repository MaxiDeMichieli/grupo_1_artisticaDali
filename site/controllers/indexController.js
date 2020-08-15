const dbProduct = require('../data/database');

module.exports = {
    home:(req, res, next) =>{
        res.render('index', { 
            title: 'Artística Dalí',
            productos: dbProduct
        });
    },
}
