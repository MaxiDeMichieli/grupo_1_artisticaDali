module.exports = {
    detail: (req, res, next)=> {
        res.render('productDetail', {
            title: 'Detalle de producto'
        })
    }
}