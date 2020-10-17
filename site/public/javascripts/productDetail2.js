window.addEventListener('load', () => {

const imgGrande = document.getElementById("img");
const imgChica1 = document.getElementById("img-sm1");
const imgChica2 = document.getElementById("img-sm2");
const imgChica3 = document.getElementById("img-sm3");
const imgChica4 = document.getElementById("img-sm4");

document.getElementById("img-sm1").onclick = () => {
    imgGrande.src = "/images/productos/<%- producto.imagen[0] %>";
}

document.getElementById("img-sm2").onclick = () => {
    imgGrande.src = "/images/productos/<%- producto.imagen[1] %>";
}

})