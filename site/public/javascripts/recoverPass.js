/* LOADING BACKGROUND */

let formEmail = document.getElementById('email-recover');
let backgroundCargando = document.getElementById('background-cargando');

formEmail.addEventListener('submit', (e) => {
    backgroundCargando.classList.remove('none');
})