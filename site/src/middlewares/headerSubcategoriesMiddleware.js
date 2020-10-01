const db = require('../database/models');
const dbProduct = require('../data/dataBase')


module.exports = (req, res, next) => {
    /* db.Categories.findAll({
        include: [{association: 'subcategorias'}]
    })
        .then(resultado => {
            console.log(resultado)
            res.send(resultado)
        })
 */

    let escolar = [];
    let artistica = [];
    let oficina = [];

    dbProduct.forEach(product => {
        if (product.category == 1) {
            if (!escolar.includes(product.subcategory)) {
                escolar.push(product.subcategory)
            }
            
        }
        if (product.category == 2) {
            if (!artistica.includes(product.subcategory)) {
                artistica.push(product.subcategory)
            }
        }
        if (product.category == 3) {
            if (!oficina.includes(product.subcategory)) {
                oficina.push(product.subcategory)
            }
        }
    })


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

    next();
}