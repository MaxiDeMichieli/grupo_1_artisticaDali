window.addEventListener('load', () => {

    let provinciaSelect = document.getElementById('provincia');
    let localidadSelect = document.getElementById('localidad');
    let loadingBackground = document.getElementById('background-cargando');

    (function provinciasApi(){
        fetch('https://apis.datos.gob.ar/georef/api/provincias')
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            result.provincias.sort(function(prev,next){
                return prev.nombre > next.nombre
            })

            let options = '';

            result.provincias.forEach(provincia => {
                options += `<option value = "${provincia.nombre}">${provincia.nombre}</option>`
            })

            provinciaSelect.innerHTML += options;
        })
    })()


    function municipiosApi() {
        let provincia = provinciaSelect.value;

        loadingBackground.classList.remove('none');

        /* if(provincia == 'Ciudad Autónoma de Buenos Aires'){ */
            fetch(`https://apis.datos.gob.ar/georef/api/localidades?max=1000&provincia=${provincia}`)
            .then(function(response){
                return response.json();
            })
            .then(function(result){
                result.localidades.sort(function(prev,next){
                    return prev.nombre > next.nombre
                })

                if(localidadSelect.value != 0) {
                    localidadSelect.innerHTML = `<option selected hidden value="${localidadSelect.value}" >${localidadSelect.value}</option>`
                } else {
                    localidadSelect.innerHTML = `<option selected hidden value="0">Seleccione su localidad</option>`
                }

                let options = ''

                result.localidades.forEach(localidad => {
                    options += `<option value = "${localidad.nombre}">${localidad.nombre}</option>`
                })

                localidadSelect.innerHTML += options;
                
                loadingBackground.classList.add('none');
            })
            .catch(err => {
                console.log(err)
            })
        /* } else {
            fetch(`https://apis.datos.gob.ar/georef/api/municipios?max=1000&provincia=${provincia}`)
            .then(function(response){
                return response.json();
            })
            .then(function(result){
                result.municipios.sort(function(prev,next){
                    return prev.nombre > next.nombre
                })

                if(localidadSelect.value != 0) {
                    localidadSelect.innerHTML = `<option selected hidden value="${localidadSelect.value}" >${localidadSelect.value}</option>`
                } else {
                    localidadSelect.innerHTML = `<option selected hidden>Seleccione su localidad</option>`
                }

                let options = '';

                result.municipios.forEach(localidad => {
                    options += `<option value = "${localidad.nombre}">${localidad.nombre}</option>`
                })

                localidadSelect.innerHTML = options;
            
                loadingBackground.classList.add('none');
            })
        } */
    }

    if(provinciaSelect.value != 0){
        municipiosApi();
    }

    provinciaSelect.addEventListener('change', () => {
        municipiosApi();
    })


})