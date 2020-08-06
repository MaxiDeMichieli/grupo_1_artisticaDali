module.exports = {
    addProduct: (req, res, next) =>{
        res.render('productAdd', { 
            title: 'Formulario de carga de productos' 
        });
    }
}