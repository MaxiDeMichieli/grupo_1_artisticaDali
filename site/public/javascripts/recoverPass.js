/* VIEW PASSWORD */

let btn1 = document.getElementById('btn-pass-1');
let btn2 = document.getElementById('btn-pass-2');

let pass1 = document.getElementById('password');
let pass2 = document.getElementById('passwordRepeat');

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