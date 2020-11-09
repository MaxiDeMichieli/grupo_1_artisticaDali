const db = require('../database/models')
const nodemailerTransporter = require('../functions/nodemailerTransporter');

module.exports = {
    home:(req, res) =>{
        db.Products.findAll({include:[{association:'imagenes'}]})
        .then(function(productos){
            res.render('index', { 
                title: 'Artística Dalí',
                session: req.session,
                subcategories: req.subcategories,
                productos: productos,
                imagen:productos
            });
        })
    },
    contact: (req, res) => {
        let sucursal1 = {
            nombre: 'Máximo Da Vinci',
            domicilio:'Salerno 1180, San Miguel.',
            horarios:'Lunes a domingos de 06:00 a 23:30',
            telefono:'011-4232-5830',
            email:'artisticadali@gmail.com',
        }
        let sucursal2 = {
            nombre: 'Jonatan Velázquez',
            domicilio:'Crisólogo Larralde 5951, Wilde.',
            horarios:'Lunes a viernes de 09:00 a 14:00',
            telefono:'011-3142592',
            email:'artisticadali@gmail.com',
        }

        res.render('contact', {
            title:'Contacto',
            session: req.session,
            subcategories: req.subcategories,
            sucursal1: sucursal1,
            sucursal2: sucursal2
        })
    },
    formEmail: function(req, res){
        let consultaDeUsuario = {
            email : req.body.email,
            nombre : req.body.nombre,
            telefono : req.body.telefono,
            consulta : req.body.consulta
        }
        
        let mailOptions = {
            from: 'Artística Dalí <artisticadali@gmail.com>',
            to: 'artisticadali@gmail.com',
            subject: `${consultaDeUsuario.nombre} te ha enviado una consulta`,
            html: 
            ` <div class="header" style="width:100%;background-color: #fff;padding: 5px;">
            
            <div class="img" style="width: 30%;min-width: 140px;max-width: 270px;margin:0 auto"><img src="https://i.postimg.cc/kMbCXbwz/logo.png" alt="Artística Dalí" style="width: 100%;"></div>
            </div>
            <div class="body" style="max-width: 700px;margin: 0 auto;">
            <p>${consultaDeUsuario.nombre} quiere contactarse con nosotros</p>
            <p>
            Su correo electronico es: ${consultaDeUsuario.email}
            </p>
            <p>
            Su número de teléfono es: ${consultaDeUsuario.telefono}
            </p>
            <p>
            Nos ha enviado la siguiente consulta: ${consultaDeUsuario.consulta} 
            </p>
            </div>
            
            </div>`
        }
        
        nodemailerTransporter.sendMail(mailOptions, (err, data) => {
            
            console.log('email enviado')
            res.redirect('/')
            
        });
    }
}
