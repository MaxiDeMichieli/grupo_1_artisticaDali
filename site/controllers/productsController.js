const dbProduct = require('../data/dataBase');
const dbUsers = require('../data/usersDataBase');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

Array.prototype.unique=function(a){return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0})
        

module.exports = {
    cart: (req, res, next)=>{
        res.render('productCart', {
            title: 'Carrito de compras',
            subcategories: req.subcategories,
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
            subcategories: req.subcategories,
            producto: producto[0],
            productos: dbProduct
        });
    },
    addProduct: (req, res, next) =>{
        let subcategorias = []
        dbProduct.filter(element =>{
            subcategorias.push(element.subcategory)
        })
        let products = []
        dbProduct.filter(element =>{
            products.push(element)
        })
        
        res.render('productAdd', { 
            title: 'Formulario de carga de productos',
            subcategoria: subcategorias.unique().sort(),
            productos: products.unique().sort()
        });
  
    },
    create: (req, res, next)=>{
        let errors = validationResult(req);
        let lastId = 1;
        if(errors.isEmpty()){
        dbProduct.forEach(producto=>{
            if(producto.id>lastId){
                lastId = producto.id
            }
        })

        let newProduct = {
            id: lastId + 1,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            discount: req.body.discount,
            category: req.body.category,
            subcategory: req.body.subcategory,
            image:[(req.files[0])?req.files[0].filename:"default-image.png"]
        }
        
        dbProduct.push(newProduct);
        
        fs.writeFileSync(path.join(__dirname, "..", "data", "productsDataBase.json"),JSON.stringify(dbProduct),'utf-8')
        
        res.redirect('/products/create')
    }else{
        res.render('productAdd',{
            title: 'Error',
            errors:errors.errors,
        })
        console.log(errors.errors)
    }
    },
    categories : (req, res)=>{
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

        let subcategoriasFiltradas = [];

        let categoryId = req.params.id;

        dbProduct.forEach(element =>{
            if(element.category == categoryId){
                if(!subcategoriasFiltradas.includes(element.subcategory)){
                    subcategoriasFiltradas.push(element.subcategory);
                }
            }
            
        });

        categorias.forEach(categoria =>{
            if(categoria.cat == categoryId){
            res.render('categories', {
                title: categoria.title,
                subcategories: req.subcategories,
                productos: dbProduct.filter(producto =>{
                    return producto.category == categoryId
                }),
                subcategory: subcategoriasFiltradas,
                banner: categoria.img
            });
        }
        
        })
    },
    subcategories: (req, res) => {
        let subcategory = req.params.id;

        res.render('categories', {
            title: subcategory,
            subcategories: req.subcategories,
            productos: dbProduct.filter(producto => {
                return producto.subcategory == subcategory;
            }),
            subcategory: [subcategory]
        })

    },
    search: (req, res) => {
        let buscar = req.query.search.toLowerCase();
        let productos = [];
        dbProduct.forEach(producto => {
            if (producto.name.toLowerCase().includes(buscar)) {
                productos.push(producto)
            }
        });

        let subcategoriasFiltradas = [];

        productos.forEach(element =>{
            if(!subcategoriasFiltradas.includes(element.subcategory)){
                subcategoriasFiltradas.push(element.subcategory);
            }
        });

        if(productos[0] == undefined) {
            res.render('errorSearch', {
                title: 'Error en su búsqueda',
                subcategories: req.subcategories,
                search: buscar
            })
        } else{
            res.render('categories', {
            title: "Resultado de la búsqueda",
            subcategories: req.subcategories,
            productos: productos,
            search: buscar,
            subcategory: subcategoriasFiltradas
            })
        } 
    },
    toEdit:(req,res,next)=>{
        let idProduct = req.params.id;
        dbProduct.forEach(element=>{
            if (element.id == idProduct) {
                res.render('editProduct',{
                    title: 'Edicion de producto',
                    titulo: 'Estás editando el producto: ',
                    id: element.id,
                    category: element.category,
                    subcategory: element.subcategory,
                    name: element.name.trim(),
                    price: element.price,
                    discount: element.discount,
                    image: element.image,
                    description: element.description.trim()
                })
            }
        })
    },
    edit:(req, res, next)=>{
        let errors = validationResult(req)
        let idProduct = req.params.id;
        if(errors.isEmpty()){
        dbProduct.forEach(producto => {
            if(producto.id == idProduct){
            producto.category = req.body.category,
            producto.subcategory = req.body.subcategory,
            producto.name = req.body.name,
            producto.price = req.body.price,
            producto.discount = req.body.discount,
            producto.description = req.body.description;
                if (typeof req.files[0] != 'undefined'){
                fs.unlinkSync('public/images/productos/' + producto.image);
                producto.image = [req.files[0].filename]
                }
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dbProduct), 'utf-8')  
    
        res.redirect('/products/edit')
    }else{
        let idProduct = req.params.id;
        dbProduct.forEach(element=>{
            if (element.id == idProduct) {
                res.render('editProduct',{
                    title: 'Edicion de producto',
                    titulo: 'Estás editando el producto: ',
                    id: element.id,
                    category: element.category,
                    subcategory: element.subcategory,
                    name: element.name.trim(),
                    price: element.price,
                    discount: element.discount,
                    image: element.image,
                    description: element.description.trim(),
                    errors:errors.errors
                })
            }
        })
    }
    },
    editionPage:(req,res,next)=>{
        res.render('editBrowser', {
            title: 'Buscador de productos a editar o eliminar',
            productos: dbProduct
        })
            
        
    },
    browserToEdit:(req, res) => {
        let buscar = req.query.search.toLowerCase();
        let productos = [];
        dbProduct.forEach(producto => {
            if (producto.name.toLowerCase().includes(buscar)) {
                productos.push(producto)
            }
        })

        if(productos[0] == undefined) {
            res.render('editBrowser', {
                title: 'Error en su búsqueda',
                productos: productos,
                search: buscar
            })
        } else{
            res.render('editBrowser', {
            title: "Resultado de la búsqueda",
            productos: productos,
            search: buscar
            })
        } 
    },
    delete:(req, res)=>{
        let idProduct = req.params.id;
        idProduct = parseInt(idProduct)

        let productFilter = dbProduct.filter(element =>{
            return element.id != idProduct;
        });

        /* ELIMINO IMAGEN */
        dbProduct.forEach(producto => {
            if (producto.id == idProduct) {
                fs.unlinkSync('public/images/productos/' + producto.image)
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productFilter), 'utf-8')

        res.redirect('/products/edit')
    }
}