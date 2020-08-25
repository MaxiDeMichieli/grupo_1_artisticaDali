const dbProduct = require('../data/dataBase');
const dbUsers = require('../data/usersDataBase');

module.exports = {
    cart: (req, res, next)=>{
        res.render('productCart', {
            title: 'Carrito de compras',
            productos: dbProduct,
            user: dbUsers[dbUsers.length - 1]
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
    },
    search: (req, res) => {
        let buscar = req.query.search.toLowerCase();
        let productos = [];
        dbProduct.forEach(producto => {
            if (producto.name.toLowerCase().includes(buscar)) {
                productos.push(producto)
            }
        })

        if(productos[0] == undefined) {
            res.render('errorSearch', {
                title: 'Error en su búsqueda',
                search: buscar
            })
        } else{
            res.render('categories', {
            title: "Resultado de la búsqueda",
            productos: productos,
            search: buscar
            })
        }

        
    }
}