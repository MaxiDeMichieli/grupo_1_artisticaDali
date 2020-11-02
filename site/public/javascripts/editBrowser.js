window.addEventListener('load', function(){
    
    let btnDelete = document.getElementById('btn-deleteProduct');
    let formDeleteProduct = document.getElementById('deleteProduct')


    formDeleteProduct.addEventListener('submit', function(){
    let resultado = window.confirm('¿Quieres eliminar el producto?')
    if(resultado == true){
        alert('Producto eliminado')
    }else{
        return false
    }})
      
     
})