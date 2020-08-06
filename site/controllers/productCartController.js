module.exports = {
    cart: (req, res, next)=>{
        res.render('productCart', {
            title: 'Carrito de compras'
        })
    }
}