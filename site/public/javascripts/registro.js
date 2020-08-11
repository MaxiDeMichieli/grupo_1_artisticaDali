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