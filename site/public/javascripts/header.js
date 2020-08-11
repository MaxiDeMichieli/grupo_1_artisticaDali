/* HEADER */

/* HAMBURGUESA */

const activeNav = () => {
    document.getElementById("nav").classList.toggle("active-nav");
}

const hamburguesa = () => {
    document.getElementById("nav-icon").classList.toggle("active");
}

document.getElementById("nav-btn").onclick = () => {
    hamburguesa();
    activeNav()
}


/* BUSCADOR */

const activeBuscador = () => {
    document.getElementById("buscador").classList.toggle("buscador-active");
}

const iconoBuscador = () => {
    document.getElementById("icon-buscador").classList.toggle("fa-search");
}

const iconoCruz = () => {
    document.getElementById("icon-buscador").classList.toggle("fa-times");
}

document.getElementById("buscador-icon").onclick = () => {
    activeBuscador();
    iconoBuscador();
    iconoCruz();
}


/* CATEGORIAS */

const activeSubcategorias = () => {
    document.getElementById("subcategorias").classList.toggle("categoria-active");
}


/* ESCOLAR */

const activeEscolar = () => {
    document.getElementById("escolar-categorias").classList.toggle("categoria-active")
}

document.getElementById("escolar").onclick = () => {
    hamburguesa();
    activeNav();
    activeSubcategorias()
    activeEscolar();
}

document.getElementById("atras-escolar").onclick = () => {
    activeEscolar();
    activeSubcategorias();
}


/* ARTISTICA */

const activeArtistica = () => {
    document.getElementById("artistica-categorias").classList.toggle("categoria-active")
}

document.getElementById("artistica").onclick = () => {
    hamburguesa();
    activeNav();
    activeSubcategorias()
    activeArtistica();
}

document.getElementById("atras-artistica").onclick = () => {
    activeArtistica();
    activeSubcategorias();
}


/* OFICINA */

const activeOficina = () => {
    document.getElementById("oficina-categorias").classList.toggle("categoria-active")
}

document.getElementById("oficina").onclick = () => {
    hamburguesa();
    activeNav();
    activeSubcategorias()
    activeOficina();
}

document.getElementById("atras-oficina").onclick = () => {
    activeOficina();
    activeSubcategorias();
}

/* TERMINA HEADER */