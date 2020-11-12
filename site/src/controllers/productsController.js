const db = require('../database/models')
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const {Op} = require('sequelize')


module.exports = {
    /* CARRITO DE COMPRAS */
    cart: (req, res)=>{
        let userId = req.session.usuario.id;
        db.Carts.findAll({
            where: {
                usuario_id: userId
            },
            include: [{association: 'producto',
                include: [{association: 'imagenes'}]
            }]
        })
        .then(productos => {
            db.Users.findByPk(userId)
            .then(usuario => {
                res.render('productCart', {
                    title: 'Carrito de compras',
                    session: req.session,
                    subcategories: req.subcategories,
                    productos: productos,
                    usuario: usuario
                })
            })
        })
    },
    /* DETALLE DE PRODUCTO */
    detail: (req, res,) => {
        
        let pedidoDetalleProducto = db.Products.findByPk(req.params.id, {
            include:[{association:'imagenes'}]
        });
        
        let pedidoTodosLosProductos = db.Products.findAll({
            include:[{association:'imagenes'}]
        });
        
        Promise.all([pedidoDetalleProducto, pedidoTodosLosProductos])
        .then(function ([producto, productos]){
            res.render('productDetail', {
            title: 'Detalle de producto',
            session: req.session,
            subcategories: req.subcategories,
            producto: producto,
            productos: productos,
            imagen: producto.imagenes
        })
      }); 
      
    },
    /* AGREGAR PRODUCTO (renderiza vista)*/
    addProduct: (req, res) =>{
        
        db.Categories.findAll({
            include:[{association:'subcategorias'}]
        })
        .then((result)=>{
            res.render('productAdd', {
                title: 'Formulario de carga de productos',
                categorias:result,
                session:req.session,
                productCreated:req.query.lp
            })           
        })
        .catch(error =>{
            console.log(error)
        })     
    },
    /* AGREGAR PRODUCTO (crea el producto) */
    create: (req, res)=>{

        let errors = validationResult(req);
        let newSubcategory = req.body.addSub;

        if(newSubcategory == ''){
        
            if(errors.isEmpty()){
                
                let description = req.body.description;
                let descriptionReplaced = description.replace(/\r\n/gi, '-r-n'); /* REEMPLAZO SALTOS DE LINEA PARA PODER GUARDARLOS EN LA BASAE DE DATOS */
                
                db.Products.create({
                    nombre: req.body.name.trim(),
                    precio: Number(req.body.price.trim()),
                    descripcion: descriptionReplaced,
                    descuento: Number(req.body.discount.trim()),
                    subcategoria_id: Number(req.body.subcategory),  
                })
                .then((result)=>{
                    let id = result.id
                    db.ProductImages.create({
                        imagen:(req.files[0])?req.files[0].filename:"default-image.png",
                        producto_id:result.id
                    })
                    .then(()=>{
                        res.redirect('/products/create?lp=' + id)
                    })
                })
                .catch(error =>{
                    console.log(error)
                })
                
            }else{
                db.Categories.findAll({include:[{association:'subcategorias'}]})
            .then((result)=>{
                
                res.render('productAdd', {
                    title: 'Error',
                    categorias:result,
                    session:req.session,
                    errors:errors.errors,
                    oldAdd:req.body
                })
                
                }).catch(error =>{
                console.log(error)
                })
            }
        }else{

        /* Creación de nueva subcategoría */

            db.Subcategories.create({
                nombre : newSubcategory,
                categoria_id : req.body.category
            })
            .then(result =>{
                if(errors.isEmpty()){
                    
                    let description = req.body.description;                   
                    let descriptionReplaced = description.replace(/\r\n/gi, '-r-n'); /* REEMPLAZO SALTOS DE LINEA PARA PODER GUARDARLOS EN LA BASAE DE DATOS */
                    
                    db.Products.create({
                        nombre: req.body.name.trim(),
                        precio: Number(req.body.price.trim()),
                        descripcion: descriptionReplaced,
                        descuento: Number(req.body.discount.trim()),
                        subcategoria_id: Number(result.id),  
                    })
                    .then((result)=>{
                        
                        let id = result.id
                        
                        db.ProductImages.create({
                            imagen:(req.files[0])?req.files[0].filename:"default-image.png",
                            producto_id:result.id
                        })
                        .then(()=>{
                            res.redirect('/products/create?lp=' + id)
                        })
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }
            }) 
        } 
    },
    /* CATEGORIAS (Renderiza vista) */
    categories : (req, res)=>{
        
        db.Categories.findOne({
            where:{id:req.params.id},
            include:[{association: 'subcategorias',
            include:[{association: 'productos',
            include:[{association:'imagenes'}]}]}]
        })
        .then(categoria => {
            res.render('categories', {
                title: categoria.nombre,
                session: req.session,
                subcategories: req.subcategories,
                categoria: categoria
            });
        })
    },
    /* SUBCATEGORIAS (Renderiza vista) */
    subcategories: (req, res) => {
       
        db.Subcategories.findOne({
            where:{
                nombre:req.params.id
            },
            include:[{association: 'productos', 
            include:[{association:'imagenes'}]}]
        })
        .then(function(subcategoria){
            res.render('subcategories', {
            title: subcategoria.nombre,
            session: req.session,
            subcategories:req.subcategories,
            subcategoria: subcategoria
            })
        })
    },
    /* BUSCADOR DEL HEADER */
    search: (req, res) => {

        let buscar = req.query.search.toLowerCase();
       
        db.Products.findAll({where:{
            nombre:{
                [Op.substring]:buscar
            }},
            include:[
            {association: 'imagenes'},
            {association: 'subcategoria'}]
        })
        .then(function(resultado){

            if(resultado == 0) {
                res.render('errorSearch', {
                    title: 'Error en su búsqueda',
                    session: req.session,
                    subcategories: req.subcategories,
                    search: buscar
                })
            } else {
                let subcategorias = [];
                
                resultado.forEach(producto=>{
                    if(!subcategorias.includes(producto.subcategoria.nombre)){
                        subcategorias.push(producto.subcategoria.nombre)
                    }
                })
                
                res.render('search', {
                    title: "Resultado de la búsqueda",
                    session: req.session,
                    subcategories: req.subcategories,
                    subcategorias:subcategorias,
                    productos: resultado,
                    search: buscar,
                    subcategory: resultado
                })
        }})
    
    },
    /* EDICIÓN DE PRODUCTO (Renderiza vista) */
    toEdit:(req, res)=>{

        db.Products.findOne({
            where:{
                id: req.params.id 
            }, 
            include:[
                {association: 'imagenes'},
                {association: 'subcategoria'}]
        })
        .then(producto =>{
            db.Categories.findAll({
                include:[{association:'subcategorias'}]
            })
            .then(categorias => {
                producto.descripcion = producto.descripcion.replace(/-r-n/gi, '\r\n'); /* REEMPLAZO SALTOS DE LINEA PARA PODER GUARDARLOS EN LA BASAE DE DATOS */

                res.render('editProduct',{
                    title: 'Edicion de producto',
                    session: req.session,
                    titulo: 'Estás editando el producto: ',
                    product: producto,
                    categorias: categorias
                }) 
            })
        })
    },
    /* EDICIÓN DE PRODUCTO (Modifica el producto) */
    edit:(req, res)=>{

        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            
            let description = req.body.description;
            let descriptionReplaced = description.replace(/\r\n/gi, '-r-n'); /* REEMPLAZO SALTOS DE LINEA PARA PODER GUARDARLOS EN LA BASAE DE DATOS */

            db.Products.update({
                nombre: req.body.name,
                precio: Number(req.body.price),
                descuento: Number(req.body.discount),
                descripcion: descriptionReplaced,
                subcategoria_id: Number(req.body.subcategory),  
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/products/edit')
            })
        }else{
            db.Products.findOne({
                where:{
                    id: req.params.id 
                }, 
                include:[
                    {association: 'imagenes'}, 
                    {association: 'subcategoria'}]
            })
            .then(producto =>{
                db.Categories.findAll({
                    include:[{association:'subcategorias'}]
                })
                .then(categorias => {
                    producto.descripcion = producto.descripcion.replace(/-r-n/gi, '\r\n'); /* REEMPLAZO SALTOS DE LINEA PARA PODER GUARDARLOS EN LA BASAE DE DATOS */
    
                    res.render('editProduct',{
                        title: 'Edicion de producto',
                        session: req.session,
                        titulo: 'Estás editando el producto: ',
                        product: producto,
                        categorias: categorias,
                        errors: errors.errors
                    }) 
                })
            })
        }   
        
    },
    /* EDICION O ELIMINACION DE PRODUCTOS (Renderiza vista) */
    editionPage:(req, res)=>{
        db.Products.findAll({
            include:[{association:'imagenes'}]
        })
        .then((productos) => {
            res.render('editBrowser', {
                title: 'Buscador de productos a editar o eliminar',
                session: req.session,
                productos: productos
            })
        }) 
    },
    /* EDICION O ELIMINACION DE PRODUCTOS (Buscador) */
    browserToEdit:(req, res) => {
        let buscar = req.query.search.toLowerCase();

        db.Products.findAll({
            where:{
                nombre:{
                    [Op.substring]:buscar
                }
            },
            include:{association: 'imagenes'}
        })
        
        .then(function(resultado){
            if(resultado == 0) {
                res.render('editBrowser', {
                    title: 'Error en su búsqueda',
                    session: req.session,
                    productos: resultado,
                    search: buscar
                })
            } else{
                res.render('editBrowser', {
                    title: "Resultado de la búsqueda",
                    session: req.session,
                    productos: resultado,
                    search: buscar
                })
        }})
    },
    /* EDICION O ELIMINACION DE PRODUCTOS (Elimina producto) */
    delete:(req, res)=>{

        db.ProductImages.findAll({
            where:{
            producto_id:req.params.id
            }
        })
        .then(imagenes => {
            
            let eliminarImagen = db.ProductImages.destroy({
                where:{
                producto_id:req.params.id
            }})
    
            let eliminarCarrito = db.Carts.destroy({
                where:{
                producto_id:req.params.id 
            }})
    
            let eliminarProducto = db.Products.destroy({
                where:{
                    id: req.params.id
                }
            })
            
            Promise.all([eliminarImagen, eliminarCarrito, eliminarProducto])        
            .then(function(resultado){
                imagenes.forEach(imagen => {
                    if(imagen.imagen != 'default-image.png'){
                        fs.unlinkSync('public/images/productos/' + imagen.imagen)
                    }
                })

                res.redirect('/products/edit')   
            })
            .catch(error=>{
                res.send(error)
                console.log(error)
            })
        })
        .catch(error => {
            res.send(error);
        })
    }
}