const db = require('../database/models');
const dbProduct = require('../data/dataBase')


module.exports = (req, res, next) => {
    db.Categories.findAll({
        include: [{association: 'subcategorias'}]
         })
        .then(resultado => {
            
            let escolar = [];
            let artistica = [];
            let oficina = [];

            resultado.forEach(categoria => {
                if (categoria.id == 1) {
                    categoria.subcategorias.forEach(sub =>{
                        escolar.push(sub.nombre) 
                    })
                }
                if (categoria.id == 2) {
                    categoria.subcategorias.forEach(sub =>{
                        artistica.push(sub.nombre) 
                    })
                }
                if (categoria.id == 3) {
                    categoria.subcategorias.forEach(sub =>{
                        oficina.push(sub.nombre) 
                    })
                }
                let separador = (array) => {
                    let cantidad = Math.ceil(array.length / 5);
            
                    let categories = {}
            
                    for (i = 0; i < cantidad; i++) {
                        eval('categories.ul' + (i + 1) + '= []')
                    }
            
                    let iterator = 1;
            
                    array.forEach((cat) => {
                        if(eval('categories.ul' + iterator).length == 5) {
                            iterator++
                        }
                        eval('categories.ul' + iterator).push(cat)
                    })
            
                    return categories;
                }
            
                req.subcategories = {escolar: separador(escolar) , artistica: separador(artistica), oficina: separador(oficina)}
            }) 
            next();
        })
    
}