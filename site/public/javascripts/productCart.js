function radio(x){
    if(x == 0){
        document.getElementById("sucursal-inputs").classList.remove("none");
        document.getElementById("domicilio-inputs").classList.add("none");
    } else {
        document.getElementById("domicilio-inputs").classList.remove("none");
        document.getElementById("sucursal-inputs").classList.add("none");
    }
}