const dbUsers = require('../data/usersDataBase.js');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check,validationResult,body} = require('express-validator');
const nodemailer = require('nodemailer');
const nodemailerTransporter = require('../functions/nodemailerTransporter')

module.exports = {
    registerView: (req, res) => {
        let id = req.params.id;
        if(id){
            if(id == 'success'){
                res.render('register', {
                    title: 'Inicia sesión',
                    msg: '!Felicitaciones, creaste tu cuenta! Ya podes iniciar sesión'
                });
            } else if(id == 'recovered'){
                res.render('register', {
                    title: 'Inicia sesión',
                    msg: '!Felicitaciones, cambiaste la contraseña de tu cuenta correctamente! Ya podes iniciar sesión'
                });
            } else{
                res.status(404).send("error");
            }
        } else{
            res.render('register', {
                title: 'Inicia sesión'
            });
        }
    },
    register: (req, res) => {
        let errors = validationResult(req);

        let newUser = {
            id: dbUsers.length + 1,
            nombre: req.body.nombre.trim(),
            apellido: req.body.apellido.trim(),
            email: req.body.email.trim(),
            password: bcrypt.hashSync(req.body.password, 12),
            telefono: null,
            calle: null,
            numero: null,
            dpto: null,
            cpostal: null,
            provincia: null,
            localidad: null,
            admin: "false"
        }

        if(errors.isEmpty()){
            dbUsers.push(newUser);

            fs.writeFileSync(path.join(__dirname, '..', 'data', 'usersDataBase.json'), JSON.stringify(dbUsers), 'utf-8');

            res.redirect('/users/login/success')
        }else{
            res.render('register', {
                title: 'Crear cuenta',
                errorsRegister: errors.mapped(),
                oldRegister: req.body
            })
        }
    },
    login: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsers.forEach(user => {
                if(user.email == req.body.email){
                    req.session.usuario = {
                        id: user.id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        email: user.email,
                        hash: bcrypt.hashSync(user.password, 12),
                    }
                    if(req.body.recordar){
                        res.cookie('userArtisticaDali', req.session.usuario, {maxAge:1000*60*60*24*365})
                    }
                }
            });
            res.redirect('/')
        }else{
            res.render('register', {
                title: "Inicia sesión",
                errorsLogin: errors.mapped(),
                oldLogin: req.body
            })
        }
    },
    account: (req, res) => {
        let userInSession;
        dbUsers.forEach(user => {
            if(req.session.usuario.id == user.id){
                userInSession = user;
            }
        });

        res.render('account', {
            title: 'Mi cuenta',
            session: req.session,
            subcategories: req.subcategories,
            user: userInSession
        })
    },
    editView: (req, res) => {
        let userInSession;
        dbUsers.forEach(user => {
            if(req.session.usuario.id == user.id){
                userInSession = user;
            }
        });

        res.render('editAccount', {
            title: 'Editar mis datos',
            session: req.session,
            subcategories: req.subcategories,
            user: userInSession
        })
    },
    edit: (req, res) => {
        let idUser = req.body.id;
        dbUsers.forEach(user => {
            if (user.id == idUser) {
                user.id = Number(req.body.id);
                user.nombre = req.body.nombre.trim();
                user.apellido = req.body.apellido.trim();
                user.email = req.body.email.trim();
                user.telefono = req.body.telefono.trim();
                user.calle = req.body.calle.trim();
                user.numero = req.body.numero.trim();
                user.dpto = req.body.dpto.trim();
                user.cpostal = req.body.cpostal.trim();
                user.provincia = req.body.provincia.trim();
                user.localidad = req.body.localidad.trim();
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/usersDataBase.json'), JSON.stringify(dbUsers), 'utf-8')
        res.redirect('/users/account')
    },
    delete: (req, res) => {
        let idUser = req.body.id;

        let usersFilter = dbUsers.filter(user => {
            return user.id != idUser;
        });

        fs.writeFileSync(path.join(__dirname, '../data/usersDataBase.json'), JSON.stringify(usersFilter), 'utf-8');

        req.session.destroy();
        if(req.cookies.userArtisticaDali){
            res.cookie('userArtisticaDali','',{maxAge:-1})
        }

        res.redirect('/')
    },
    logout: (req,res) => {
        req.session.destroy();
        if(req.cookies.userArtisticaDali){
            res.cookie('userArtisticaDali','',{maxAge:-1})
        }

        return res.redirect('/')
    },
    recoverView: (req, res) => {  //VISTA DE FORMULARIO PARA RECUPERAR CONTRASEÑA
        res.render('recoverPass', {
            title: 'Recupera tu contraseña',
            msg: 'Coloca el email de tu cuenta para recuperar la contraeña'
        });
    },
    sendEmail: (req, res) => {  //POST QUE ENVIA LA URL AL EMAIL INGRESADO EN EL FORMULARIO
        let email = req.body.email;
        let errors = validationResult(req);

        if(errors.isEmpty()){
            dbUsers.forEach(user => {
                if(user.email == email){
            
                    let mailOptions = {
                        from: 'Artística Dalí <artisticadali@gmail.com>',
                        to: user.email,
                        subject: 'Recupera tu contraseña',
                        html: `<div class="header" style="width:100%;background-color: #fff;padding: 5px;"><div class="img" style="width: 30%;min-width: 140px;max-width: 270px;margin:0 auto"><img src="https://i.postimg.cc/kMbCXbwz/logo.png" alt="Artística Dalí" style="width: 100%;"></div></div><div class="body" style="max-width: 700px;margin: 0 auto;"><h2 style="color:#204051;">Hola ${user.nombre}!</h2><h3 style="text-align: center;color:#204051;">Cambia tu contraseña haciendo click en el siguiente boton:</h3><div class="boton" style="display: flex;flex-wrap: wrap;align-content: center;"><a href="http://localhost:3000/users/recover/${user.id}/${user.password.slice(7, 60).split('/').join('')}recover" style="display: inline-block;margin: 0 auto;margin-top: 30px;padding: 8px 15px;font-weight: 500;background-color: #3b6978;text-decoration: none;color: #fff;border: 2px solid #3b6978;border-radius: 50px;transition: all .5s ease;">Cambiar contraseña</a></div></div>`
                    }
            
                    nodemailerTransporter.sendMail(mailOptions, (err, data) => {
                        if(err){
                            res.redirect('/users/recover/sent/error');
                        }else{
                            console.log('email enviado')
                            res.redirect(`/users/recover/sent/${user.id}`)
                        }
                    });
                }
            });
        } else{
            res.render('recoverPass', {
                title: "Recupera tu contraseña",
                errors: errors.mapped(),
                old: req.body,
                msg: 'Coloca el email de tu cuenta para recuperar la contraeña'
            });
        }
    },
    sentView: (req, res) => {
        let userId = req.params.id;
        let userData;

        if(userId == 'error'){
            res.render('recoverPass', {
                title: 'Error al enviar el mail',
                msg: 'Lo siento! hubo un error al enviar el mail, intentalo denuevo mas tarde'
            })
        } else{
            dbUsers.forEach(user => {
                if(user.id == userId){
                    userData = user;
                }
            });
            res.render('recoverPass', {
                title: 'Mail enviado',
                msg: `Hola ${userData.nombre}! enviamos un mail a ${userData.email}. Sigue los pasos del mail para cambiar tu contraseña.`
            })
        }
    },
    changePassView: (req, res) => {
        let userId = req.params.id;
        let hash = req.params.hash;

        dbUsers.forEach(user => {
            if(user.id == userId && hash == (user.password.slice(7, 60).split('/').join('') + 'recover')){
                res.render('recoverPass', {
                    title: 'Modifica tu contraseña',
                    msg: `${user.nombre}! coloca tu nueva contraseña`
                });
            }
        });
        res.render('recoverPass', {
            title: 'Error',
            msg: 'Los siento! La direccion de recuperación de contraseña no es correcta. Por favor verifica el link del mail o vuelve a hacer todos los pasos.'
        });
    },
    changePass: (req, res) => {
        let userId = req.params.id;
        let hash = req.params.hash;
        let errors = validationResult(req);

        if(errors.isEmpty()){
            dbUsers.forEach(user => {
                if(user.id == userId && hash == (user.password.slice(7, 60).split('/').join('') + 'recover')){
                    user.password = bcrypt.hashSync(req.body.password, 12);
                    res.redirect('/users/login/recovered');
                    fs.writeFileSync(path.join(__dirname, '../data/usersDataBase.json'), JSON.stringify(dbUsers), 'utf-8');
                }
            });
            res.render('recoverPass', {
                title: 'Mail enviado',
                msg: `Lo siento! Hubo un error al cambiar la contraseña. Intenta realizar nuevamente todos los pasos`
            })
        } else{
            res.render('recoverPass', {
                title: "Modifica tu contraseña",
                errors: errors.mapped(),
                old: req.body
            });
        }
        
    }
}

