/* ADD TO CART */

let loadingBackground = document.getElementById('background-cargando');
let addProdLog = document.getElementById('addProdLog');
let addProdLogExit = document.getElementById('addProdLog-exit');
let productoAgregado = document.getElementById('productoAgregado');

/* CANTIDAD DE PRODUCTOS EN EL CARRITO */
let cantidadProductos = () => {
    fetch(`${window.location.origin}/api/products/cartProducts`)
    .then(result => {
        if(result.ok){
            return result.json();
        }else{
            return 'err';
        }
    })
    .then(result => {
        if (result != 'err') {
            cartCount.innerHTML = `<i class="fas fa-shopping-cart"></i><span class="cantidad-cart">${result.length}</span>`
        }
    })
}

function addCart(id) {
    loadingBackground.classList.remove('none');
    fetch(`${window.location.origin}/api/products/addCart/${id}/1`, {
        method: 'POST'
    })
    .then(result => {
        console.log(result)
        if(result.ok){
            return result.json();
        }else{
            return 'err';
        }
    })
    .then(result => {
        if(result != 'err'){
            setTimeout(() => {
                loadingBackground.classList.add('none');
                productoAgregado.classList.remove('none');
                setTimeout(() => {
                    productoAgregado.classList.add('none')
                }, 3000);
            }, 1000);
            cantidadProductos();

            if(result.visitor) {
                addProdLog.classList.remove('none');
            }
        }
    })
}

addProdLogExit.addEventListener('click', () => {
    addProdLog.classList.add('none')
})