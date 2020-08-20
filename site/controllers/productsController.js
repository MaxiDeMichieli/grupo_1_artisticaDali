const dbProduct = require('../data/database');

module.exports = {
    cart: (req, res, next)=>{
        res.render('productCart', {
            title: 'Carrito de compras',
            productos: dbProduct
        })
    },
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
    },
    addProduct: (req, res, next) =>{
        res.render('productAdd', { 
            title: 'Formulario de carga de productos' 
        });
    },
    categories : (req, res, next)=>{
        let categorias = [
            {
                cat:1, title: "Escolar", img: "banner_escolar.jpg"
            },
            {
                cat:2, title: "Artística", img: "banner_artistica.jpg"
            },
            {
                cat:3, title: "Oficina", img: "banner_oficina.jpg"
            }
        ];
        let categoryId=req.params.id;
        categorias.forEach(categoria =>{
            if(categoria.cat == categoryId){
            res.render('categories', {
                title: categoria.title,
                productos: dbProduct,
                banner: categoria.img
            });
        }
        
        })
    }
}