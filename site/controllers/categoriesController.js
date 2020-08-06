module.exports = {
    categories : (req, res, next)=>{
        let id= req.params.id;
        if(id==1){
            res.render('categories', {
                category1: 'Escolar'
            })
        };
        if(id==2){
            res.render('categories', {
                category2: 'Artistica'
            })
        };
        if(id==3){
            res.render('categories', {
                category3: 'Oficina'
            })
        };
    }
}