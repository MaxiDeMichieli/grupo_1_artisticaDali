let ge = (element) => {
    return document.getElementById(element);
}

let loadingBackground = ge('background-cargando');
let contenedorProductos = ge('contenedor-productos');
let cantidadBackground = ge('background-cantidad');
let cancelarCantidad = ge('cancelar-cantidad');
let aceptarCantidad = ge('aceptar-cantidad');
let inputCantidad = ge('cantidad-input');
let cantidad = ge('cantidad')

function radio(x){
    if(x == 0){
        document.getElementById("sucursal-inputs").classList.remove("none");
        document.getElementById("domicilio-inputs").classList.add("none");
    } else {
        document.getElementById("domicilio-inputs").classList.remove("none");
        document.getElementById("sucursal-inputs").classList.add("none");
    }
}


/* LISTAR PRODUCTOS */

let listarProductos = () => {
    fetch(`${window.location.origin}/api/products/cartProducts`)
        .then(result => {
            if(result.ok){
                return result.json();
            }else{
                return 'err';
            }
        })
        .then(result => {
            if(result != 'err'){
                if(result == 0){window.location.reload()}
                /* console.log(result); */
                contenedorProductos.innerHTML = ''
                let precio = 0;

                result.forEach(carrito => {
                    precio += carrito.producto.precio * carrito.cantidad;

                    contenedorProductos.innerHTML += `<div class="producto">
                    <div class="imagen">
                        <img src="/images/productos/${carrito.producto.imagenes[0].imagen}" alt="">
                    </div>
                    <div class="detalles">
                        <h3>${carrito.producto.nombre}</h3>
                        <div class="precio">
                            <span class="precio-unitario">$${carrito.producto.precio} c/u</span>
                            <span class="total">Total: &nbsp </span>
                            <span class="precio-sumado">$${carrito.producto.precio * carrito.cantidad}</span>
                        </div>
                        <div class="contenedor-cantidad">
                            <input type="number" class="cantidad none">
                        </div>
                        <div class="botones">
                            <button class="cantidad" type="button" onclick="cantidadBtn(${carrito.producto.id})" >Cantidad: <span>${carrito.cantidad}</span> <i class="fas fa-angle-down"></i></button>
                            <span class="eliminar" onclick="deleteProduct(${carrito.producto.id})"><i class="fas fa-trash"></i></span>
                        </div>
                    </div>
                </div>`
                })

                precioSubtotal.innerHTML = `$${precio}`
                precioTotal.innerHTML = `$${precio + 340}`

                loadingBackground.classList.add('none');
            }
        })
}


/* ELIMIAR PRODUCTO DEL CARRITO */

let deleteProduct = (id) => {
    loadingBackground.classList.remove('none');
    fetch(`${window.location.origin}/api/products/removeCart/${id}`, {
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
        if(result == 'err'){
            loadingBackground.classList.add('none');
        }
    })
    .then(() => {
        listarProductos();
    })
}

let producto;

let cantidadBtn = (id) => {
    inputCantidad.value = 1
    cantidadBackground.classList.remove('none');
    producto = id
}

cancelarCantidad.addEventListener('click', () => {
    cantidadBackground.classList.add('none')
})

aceptarCantidad.addEventListener('click', () => {
    cantidadBackground.classList.add('none');
    loadingBackground.classList.remove('none');

    fetch(`${window.location.origin}/api/products/qtyCart/${producto}/${inputCantidad.value}`, {
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
            listarProductos()
            loadingBackground.classList.add('none')
        }
        
    })
})