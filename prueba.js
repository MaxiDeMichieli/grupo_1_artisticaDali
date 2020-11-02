let nombres = {};

(function ciclo() {
    for (i = 1; i != 4; ++i) {
        eval(`nombres.nombre${i} = "nombre${i}"`)
        /* if (eval('typeof nombre' + i + '!= "undefined"')) {
            eval('nombres.nombre' + i + '= nombre' + i)
        } else {
            return
        } */
    }
})()

console.log(nombres)