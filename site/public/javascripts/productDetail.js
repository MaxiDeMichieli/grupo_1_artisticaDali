window.addEventListener('load', () => {

    function id(e) {
        return document.getElementById(e);
    }

    let formulario = id('formAgregarProducto');
    let cantidad = id('cantidad');
    let agregado = id('productoAgregado');
    let formAction = formulario.attributes.action.textContent;
    let loadingBackground = id('background-cargando');
    let addProdLog = id('addProdLog');
    let addProdLogExit = id('addProdLog-exit');


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

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        loadingBackground.classList.remove('none');

        fetch(`${window.location.origin}/api/products/addCart/${formAction}/${cantidad.value}`, {
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
                    loadingBackground.classList.add('none');
                    addProdLog.classList.remove('none');
                } else {
                    setTimeout(() => {
                        loadingBackground.classList.add('none');
                        agregado.style.top = "40px";
                        agregado.style.opacity = "1";
                        setTimeout(() => {
                            agregado.style.top = "-170px";
                            agregado.style.opacity = "0";
                        }, 3000)
                    }, 1000)
                    cantidadProductos();
                }
            }
        })
    })


    addProdLogExit.addEventListener('click', () => {
        addProdLog.classList.add('none');
    })

})