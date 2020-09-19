const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'artisticadali@gmail.com',
        clientId: '993659406968-vsconj0nj93nh845ht22fbn3tktcd971.apps.googleusercontent.com',
        clientSecret: 'RpnPgLRKfcX5uNDw1G5fGuPP',
        refreshToken: '1//04SmuYljXanQQCgYIARAAGAQSNgF-L9Ir95uRxTv15jKYorioXWxxaiOnrvw4uOwpYtTHZcUv_h-3bkI1DVoHRdGPnXnFJs6tdA',
        accessToken: 'ya29.a0AfH6SMAzaCW6xLQ2XCHURaPQa4rac23XMyj7WWjY-9E_dtKEiHIJ9xK-gOg6ui6nIK4IlIMHDotlpZrULWib8-6Lkidt6lAocLIyeJe3sM8wEsZPT2DUkwfU68cNVPl7zV2_ot_vnoMg8gboiUN0J6dPV5HTswQZB24'
        /* EN UN FUTURO TODOS LOS DATOS DEBEN ESTAR EN VARIABLES DE ENTORNO, ESTO ES SOLO UNA PRUEBA */
    }
});

module.exports = transporter