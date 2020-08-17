/* HEADER */

/* HAMBURGUESA */

const activeNav = () => {
    document.getElementById("nav").classList.toggle("active-nav");
}

const hamburguesa = () => {
    document.getElementById("nav-icon").classList.toggle("active");
}

const desactiveHamburguesa = () => {
    document.getElementById("nav-icon").classList.remove("active");
}

const desactiveSubcategorias = () => {
    document.getElementById("subcategorias").classList.remove("categoria-active");
}

const desactiveCategorias = () => {
    document.getElementById("escolar-categorias").classList.remove("categoria-active");
    document.getElementById("artistica-categorias").classList.remove("categoria-active");
    document.getElementById("oficina-categorias").classList.remove("categoria-active");
}

document.getElementById("nav-btn").onclick = () => {
    desactiveSubcategorias();
    desactiveCategorias();
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
    document.getElementById("subcategorias").classList.add("categoria-active");
}



const desactiveNav = () => {
    document.getElementById("nav").classList.remove("active-nav");
}

/* ESCOLAR */

const activeEscolar = () => {
    document.getElementById("escolar-categorias").classList.add("categoria-active")
}

const desactiveEscolar = () => {
    document.getElementById("escolar-categorias").classList.remove("categoria-active")
}

document.getElementById("escolar").onclick = () => {
    desactiveHamburguesa();
    desactiveNav();
    activeSubcategorias()
    activeEscolar();
    desactiveOficina();
    desactiveArtistica();
}

document.getElementById("atras-escolar").onclick = () => {
    desactiveCategorias();
}


/* ARTISTICA */

const activeArtistica = () => {
    document.getElementById("artistica-categorias").classList.add("categoria-active")
}

const desactiveArtistica = () => {
    document.getElementById("artistica-categorias").classList.remove("categoria-active")
}

document.getElementById("artistica").onclick = () => {
    desactiveHamburguesa();
    desactiveNav();
    activeSubcategorias()
    activeArtistica();
    desactiveEscolar();
    desactiveOficina();
}

document.getElementById("atras-artistica").onclick = () => {
    desactiveCategorias();
}


/* OFICINA */

const activeOficina = () => {
    document.getElementById("oficina-categorias").classList.add("categoria-active")
}

const desactiveOficina = () => {
    document.getElementById("oficina-categorias").classList.remove("categoria-active")
}

document.getElementById("oficina").onclick = () => {
    desactiveHamburguesa();
    desactiveNav();
    activeSubcategorias()
    activeOficina();
    desactiveArtistica();
    desactiveEscolar();
}

document.getElementById("atras-oficina").onclick = () => {
    desactiveCategorias();
}

/* TERMINA HEADER */