window.addEventListener('load', () => {
    
    let checkSubcategoria = document.getElementById('checkSubcategoria');
    let inputAddSubcategoria = document.getElementById('addSubcategoria');
    let subcategoriaSelect = document.getElementById('subcategorySelect');
    let categorySelect = document.getElementById('categorySelect');
    let inputProduct = document.getElementById('inputProduct');
    let inputDiscount = document.getElementById('inputDiscount');
    let description = document.getElementById('description');
    let inputPrice = document.getElementById('inputPrice');
    let inputImage = document.getElementById('examinar');

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

    /* VALIDACIONES */  

    //Selección de categorías

    categorySelect.addEventListener('blur', function(){
        if(this.value == 0){
            this.classList.add('is-invalid');
            let error = 'Elige una categoria';
            errorCategory.innerHTML = error 
        }else{
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorCategory.innerHTML = ''
        }
    })

    //Selección de subcategorías

    subcategorySelect.addEventListener('blur', function(){
        if(this.value == 0){
            this.classList.add('is-invalid');
            let error = 'Elige una subcategoria';
            errorSubCategory.innerHTML = error 
        }else{
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            errorSubCategory.innerHTML = ''
        }
    })

    //Nombre

    let productNameValidator = () => {
        switch (true) {
            case inputProduct.value == 0:
                var error = 'Ingresa un nombre de producto';
                errorProduct.innerHTML = error; 
                inputProduct.classList.add('is-invalid');
                break;
            case inputProduct.value.length <=2:
                error = 'Ingresa un nombre no menor de tres letras';
                errorProduct.innerHTML = error;
                inputProduct.classList.add('is-invalid');  
                break;
            default:     
                inputProduct.classList.remove('is-invalid');
                inputProduct.classList.add('is-valid');
                errorProduct.innerHTML = ''
        }
    }
    inputProduct.addEventListener('blur', function(){
        productNameValidator()
    })
    inputProduct.addEventListener('keyup', function(){
        productNameValidator()
    })

    //Precio

    let productPriceValidator = () => {
        switch (true) {
            case inputPrice.value == 0:
                inputPrice.classList.add('inputError');
                var error = 'Ingresa un precio';
                errorPrice.innerHTML = error
                break;
            case inputPrice.value.length <=1:
                error = 'Ingresa precio válido';
                errorPrice.innerHTML = error;
                inputPrice.classList.add('is-invalid');  
                break;
            default:     
                inputPrice.classList.remove('is-invalid');
                inputPrice.classList.add('is-valid');
                errorPrice.innerHTML = ''
        }
    }
    inputPrice.addEventListener('blur', function(){
        productPriceValidator()
    })
    inputPrice.addEventListener('keyup', function(){
        productPriceValidator()
    })

    // Descripción 

    let productDescriptionValidator = () => {
        switch (true) {
            case description.value.length <=2:
                error = 'Ingresa una descripción detallada del producto';
                errorDescription.innerHTML = error;
                description.classList.add('is-invalid');  
                break;
            case description.value.length >=800:
                error = 'Sólo puedes ingresar hasta 800 caracteres';
                errorDescription.innerHTML = error;
                description.classList.add('is-invalid');  
                break;    
            default:     
                description.classList.remove('is-invalid');
                description.classList.add('is-valid');
                errorDescription.innerHTML = ''
        }
    }
    description.addEventListener('blur', function(){
        productDescriptionValidator()
    })
    description.addEventListener('keyup', function(){
        productDescriptionValidator()
    })

    /* VALIDACION DE CARGA DE IMAGENES Y PREVISUALIZACION */
    inputImage.addEventListener('change', 
    function fileValidation(){
        var errorImage = document.getElementById('errorImage')
        var filePath = inputImage.value; //Capturo el valor del input
        var allowefExtensions = /(.jpg|.jpeg|.png|.gif)$/i; //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            let error = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)'
            errorImage.innerHTML = error;
            inputImage.value = '';
            document.getElementById('imagePreview').innerHTML = '';
            return false;
        }else{
            // Image preview
            if(inputImage.files && inputImage.files[0]){
                var reader = new FileReader();
                reader.onload = function(e){
                    document.getElementById('imagePreview').innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL(inputImage.files[0]);
                errorImage.innerHTML = '';
            }
        }
    })

})