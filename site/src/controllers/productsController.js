const dbProduct = require('../data/dataBase');
const dbUsers = require('../data/usersDataBase');
const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
        

module.exports = {
    cart: (req, res)=>{
        let userInSession;
        dbUsers.forEach(user => {
            if(req.session.usuario.id == user.id){
                userInSession = user;
            }
        });

        res.render('productCart', {
            title: 'Carrito de compras',
            session: req.session,
            subcategories: req.subcategories,
            productos: dbProduct,
            user: userInSession
        })
    },
    detail: (req, res,) => {
        let idProduct = req.params.id;
        let producto = dbProduct.filter(producto => {
            return producto.id == idProduct;
        });
        res.render('productDetail', {
            title: 'Detalle de producto',
            session: req.session,
            subcategories: req.subcategories,
            producto: producto[0],
            productos: dbProduct
        });
    },
    addProduct: (req, res) =>{
        db.Categories.findAll({
            include:[{association:'subcategorias'}]
        })
            .then(categorias =>{
                res.render('productAdd', { 
                    title: 'Formulario de carga de productos',
                    categorias:categorias,
                    session: req.session,
                    productCreated: req.query.lp, /* last product created */
                })
            })
            .catch(error =>{
                console.log(error)
        })
    },
    create: (req, res)=>{
        let errors = validationResult(req);
        let lastId = 1;
        if(errors.isEmpty()){
            db.Products.create({
                nombre:req.body.name.trim(),
                precio:Number(req.body.price.trim()),
                descuento:Number(req.body.discount.trim()),
                descripcion:req.body.description,
                subcategoria_id:req.body.subcategory
            })
        
        res.redirect('/products/create?lp=' + (lastId + 1))
        }else{
            res.render('productAdd',{
                title: 'Error',
                session: req.session,
                errors:errors.errors,
                oldAdd:req.body
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
                session: req.session,
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
            session: req.session,
            subcategories: req.subcategories,
            productos: dbProduct.filter(producto => {
                return producto.subcategory == subcategory;
            }),
            subcategoryTitle: subcategory,
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
                session: req.session,
                subcategories: req.subcategories,
                search: buscar
            })
        } else{
            res.render('categories', {
            title: "Resultado de la búsqueda",
            session: req.session,
            subcategories: req.subcategories,
            productos: productos,
            search: buscar,
            subcategory: subcategoriasFiltradas
            })
        } 
    },
    toEdit:(req, res)=>{
        let idProduct = req.params.id;
        dbProduct.forEach(element=>{
            if (element.id == idProduct) {
                res.render('editProduct',{
                    title: 'Edicion de producto',
                    session: req.session,
                    titulo: 'Estás editando el producto: ',
                    product: element
                })
            }
        })
    },
    edit:(req, res)=>{
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
                        if(producto.image[0] != 'default-image.png'){
                            fs.unlinkSync('public/images/productos/' + producto.image);
                        }
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
                        session: req.session,
                        titulo: 'Estás editando el producto: ',
                        product: element,
                        errors:errors.errors
                    })
                }
            })
        }
    },
    editionPage:(req, res)=>{
        res.render('editBrowser', {
            title: 'Buscador de productos a editar o eliminar',
            session: req.session,
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
                session: req.session,
                productos: productos,
                search: buscar
            })
        } else{
            res.render('editBrowser', {
            title: "Resultado de la búsqueda",
            session: req.session,
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
                if(producto.image[0] != 'default-image.png'){
                    fs.unlinkSync('public/images/productos/' + producto.image)
                }
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productFilter), 'utf-8')

        res.redirect('/products/edit')
    }
}