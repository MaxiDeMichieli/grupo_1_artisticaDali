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
            if(result.visitor) {
                addProdLog.classList.remove('none');
                loadingBackground.classList.add('none');
            } else {
                setTimeout(() => {
                    loadingBackground.classList.add('none');
                    agregado.style.top = "40px";
                    agregado.style.opacity = "1";
                    setTimeout(() => {
                        agregado.style.top = "-170px";
                        agregado.style.opacity = "0";
                    }, 3000);
                }, 1000);
                cantidadProductos();
            }
        }
    })
}

addProdLogExit.addEventListener('click', () => {
    addProdLog.classList.add('none')
})