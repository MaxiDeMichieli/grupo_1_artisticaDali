const dbProduct = require('../data/dataBase.js');

module.exports = {
    home:(req, res, next) =>{
        res.render('index', { 
            title: 'Artística Dalí',
            productos: dbProduct
        });
    },
}
