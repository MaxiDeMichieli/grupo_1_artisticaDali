window.addEventListener('load', () => {
    
    let checkSubcategoria = document.getElementById('checkSubcategoria');
    let inputAddSubcategoria = document.getElementById('addSubcategoria');
    let subcategoriaSelect = document.getElementById('subcategorySelect');
    let categorySelect = document.getElementById('categorySelect');

    /* MOSTRAR INPUT PARA NUEVA CATEGORIA */
    checkSubcategoria.addEventListener('change', () => {
        if(checkSubcategoria.checked){
            inputAddSubcategoria.classList.remove('none');
            subcategoriaSelect.classList.add('none');
        }else{
            inputAddSubcategoria.classList.add('none');
            subcategoriaSelect.classList.remove('none');
        }
    })

    /* LLAMAR LAS SUBCATEGORIAS DEPENDIENDO LA CATEGORIA SELECCIONADA */
    categorySelect.addEventListener('change', () => {
        fetch()
    })






})