const iniciarActive = () => {
    document.getElementById("is").classList.add("active");
    document.getElementById("cc").classList.remove("active");
    document.getElementById("inicio-sesion").classList.remove("none");
    document.getElementById("crear-cuenta").classList.add("none");
}

const crearActive = () => {
    document.getElementById("cc").classList.add("active");
    document.getElementById("is").classList.remove("active");
    document.getElementById("crear-cuenta").classList.remove("none");
    document.getElementById("inicio-sesion").classList.add("none");
}


document.getElementById("is").onclick = () => {
    iniciarActive();
}

document.getElementById("cc").onclick = () => {
    crearActive();
}


/* VIEW PASSWORD */

let btn1 = document.getElementById('btn-pass-1');
let btn2 = document.getElementById('btn-pass-2');
let btn3 = document.getElementById('btn-pass-3');

let pass1 = document.getElementById('passwordInicio');
let pass2 = document.getElementById('passwordRegistro');
let pass3 = document.getElementById('passwordRepeat');

function mostrarConstraseña(pass, btn){
    if(pass.type == "password"){
        pass.type = "text";
        btn.classList.remove("fa-eye");
        btn.classList.add("fa-eye-slash")
    } else {
        pass.type = "password";
        btn.classList.remove("fa-eye-slash");
        btn.classList.add("fa-eye")
    }
}

btn1.onclick = () => {
    mostrarConstraseña(pass1, btn1)
}

btn2.onclick = () => {
    mostrarConstraseña(pass2, btn2)
}

btn3.onclick = () => {
    mostrarConstraseña(pass3, btn3)
}



/* btn1.addEventListener('click', mostrarConstraseña()); */