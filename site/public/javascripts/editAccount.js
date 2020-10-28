window.addEventListener('load', () => {

    let provinciaSelect = document.getElementById('provincia');
    let localidadSelect = document.getElementById('localidad');
    let loadingBackground = document.getElementById('background-cargando');

    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        result.provincias.sort(function(prev,next){
            return prev.nombre > next.nombre
        })

        result.provincias.forEach(provincia => {
            provinciaSelect.innerHTML += `<option value = "${provincia.nombre}">${provincia.nombre}</option>`
        })
    })


    provinciaSelect.addEventListener('change', () => {
        let provincia = provinciaSelect.value;

        loadingBackground.classList.remove('none');

        fetch(`https://apis.datos.gob.ar/georef/api/municipios?max=1000&provincia=${provincia}`)
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            result.municipios.sort(function(prev,next){
                return prev.nombre > next.nombre
            })

            localidadSelect.innerHTML = `<option>Seleccione su localidad</option>`

            result.municipios.forEach(localidad => {
                localidadSelect.innerHTML += `<option value = "${localidad.nombre}">${localidad.nombre}</option>`
            })
            
            loadingBackground.classList.add('none');
        })

    })


})