const activePopup = () => {
    document.getElementById("popup-eliminar").classList.remove("none");
}

const desactivePopup = () => {
    document.getElementById("popup-eliminar").classList.add("none");
}

document.getElementById("eliminar-btn").onclick = () => {
    activePopup();
}

document.getElementById("cancelar-btn").onclick = () => {
    desactivePopup();
}

document.getElementById("cerrar-popup-btn").onclick = () => {
    desactivePopup();
}