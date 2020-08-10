module.exports = {
    categories : (req, res, next)=>{
        let categorias = [
            {
                "cat":1, "title": "Escolar"
            },
            {
                "cat":2, "title": "Artística"
            },
            {
                "cat":3, "title": "Oficina"
            }
        ];
        let categoryId=req.params.id;
        categorias.forEach(element =>{
            if(element.cat == categoryId){
            res.render('categories', {
                title: element.title
            });
        }
        
        })
    }
}
