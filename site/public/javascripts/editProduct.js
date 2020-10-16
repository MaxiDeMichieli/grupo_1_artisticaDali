window.addEventListener('load', () => {
    
    /* let checkSubcategoria = document.getElementById('checkSubcategoria');
    let inputAddSubcategoria = document.getElementById('addSubcategoria'); */
    let subcategoriaSelect = document.getElementById('subcategorySelect');
    let categorySelect = document.getElementById('categorySelect');

    /* MOSTRAR INPUT PARA NUEVA CATEGORIA */
    /* checkSubcategoria.addEventListener('change', () => {
        if(checkSubcategoria.checked){
            inputAddSubcategoria.classList.remove('none');
            subcategoriaSelect.classList.add('none');
        }else{
            inputAddSubcategoria.classList.add('none');
            subcategoriaSelect.classList.remove('none');
        }
    }) */

    /* LLAMAR LAS SUBCATEGORIAS DEPENDIENDO LA CATEGORIA SELECCIONADA */
    categorySelect.addEventListener('change', () => {

        fetch(`${window.location.origin}/api/products/${categorySelect.value}/subcategories`)
        .then(result => {
            if(result.ok){
                return result.json();
            }else{
                return 'err';
            }
        })
        .then(result => {
            subcategoriaSelect.innerHTML = '<option hidden selected value="0" >Elija una subcategoria</option>'
            result.subcategorias.forEach(subcategoria => {
                subcategoriaSelect.innerHTML += `<option value="${subcategoria.id}" >${subcategoria.nombre}</option>`
            })
        })

    })
})