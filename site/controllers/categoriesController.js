module.exports = {
    categories : (req, res, next)=>{
        let categories = [
            {cat: 1, name: "Escolar"},
            {cat: 2, name: "Artística"},
            {cat: 3, name: "Oficina"}
        ];
        res.render('categories', {'categories' : categories})
    }
}
