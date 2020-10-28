window.addEventListener('load', () => {

    let provinciaSelect = document.getElementById('provincia');
    let localidadSelect = document.getElementById('localidad');

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

        fetch(`https://apis.datos.gob.ar/georef/api/localidades?max=1000&provincia=${provincia}`)
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            result.localidades.sort(function(prev,next){
                return prev.nombre > next.nombre
            })

            localidadSelect.innerHTML =`<option>Seleccione su localidad</option>`

            result.localidades.forEach(localidad => {
                localidadSelect.innerHTML += `<option value = "${localidad.nombre}">${localidad.nombre}</option>`
            })
            console.log('se termino de cargar!!')
        })

    })


})