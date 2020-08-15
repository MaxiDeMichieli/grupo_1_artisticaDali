const dbProduct = require('../data/database');

module.exports = {
    detail: (req, res,) => {
        let idProduct = req.params.id;
        let producto = dbProduct.filter(producto => {
            return producto.id == idProduct;
        });
        res.render('productDetail', {
            title: 'Detalle de producto',
            producto: producto[0],
            productos: dbProduct
        });
    }
}