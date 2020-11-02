window.addEventListener('load', () => {

    function id(e) {
        return document.getElementById(e);
    }

    let formulario = id('formAgregarProducto');
    let cantidad = id('cantidad');
    let agregado = id('productoAgregado');
    let formAction = formulario.attributes.action.textContent;
    let loadingBackground = document.getElementById('background-cargando');

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
                setTimeout(() => {
                    loadingBackground.classList.add('none');
                    agregado.classList.remove('none');
                    agregado.classList.add('producto-agregado-ok');
                    setTimeout(() => {
                        agregado.classList.add('none');
                        agregado.classList.remove('producto-agregado-ok');
                    }, 3000)
                }, 3000)
            }
            
        })
    })
})