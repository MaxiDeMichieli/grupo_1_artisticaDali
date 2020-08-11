/* DETALLES DE PRODUCTO */

const imgGrande = document.getElementById("img");
const imgChica1 = document.getElementById("img1-sm");
const imgChica2 = document.getElementById("img2-sm");
const imgChica3 = document.getElementById("img3-sm");
const imgChica4 = document.getElementById("img4-sm");

document.getElementById("img1-sm").onclick = () => {
    imgGrande.src = "/images/detallesProducto/imagen-grande.png";
}

document.getElementById("img2-sm").onclick = () => {
    imgGrande.src = "/images/detallesProducto/imagen2-grande.png";
}

/* TERMINA DETALLES DE PRODUCTO */