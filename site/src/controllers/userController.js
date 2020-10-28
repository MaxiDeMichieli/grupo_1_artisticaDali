const db = require('../database/models')
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check,validationResult,body} = require('express-validator');
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

        if(errors.isEmpty()){
            db.Users.create({
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                email: req.body.email.trim(),
                password: bcrypt.hashSync(req.body.password, 12),
            })
                .then(() => {
                    res.redirect('/users/login/success')
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/user/login')
                })
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
            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then((user) => {
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
                    res.redirect('/')
                })
                .catch((err) => {
                    res.redirect('/user/login')
                })
        }else{
            res.render('register', {
                title: "Inicia sesión",
                errorsLogin: errors.mapped(),
                oldLogin: req.body
            })
        }
    },
    account: (req, res) => {
        db.Users.findOne({
            where: {
                id: req.session.usuario.id
            }
        })
            .then(user => {
                res.render('account', {
                    title: 'Mi cuenta',
                    session: req.session,
                    subcategories: req.subcategories,
                    user: user
                })
            })
    },
    editView: (req, res) => {
        db.Users.findOne({
            where: {
                id: req.session.usuario.id
            }
        })
            .then(user => {
                res.render('editAccount', {
                    title: 'Editar mis datos',
                    session: req.session,
                    subcategories: req.subcategories,
                    user: user
                })
            })
    },
    edit: (req, res) => {
        db.Users.update({
            telefono: req.body.telefono != ''?req.body.telefono.trim():null,
            calle: req.body.calle != ''?req.body.calle.trim():null,
            numero: req.body.numero != ''?req.body.numero:null,
            dpto: req.body.dpto != ''?req.body.dpto.trim():null,
            cp: req.body.cpostal != ''?req.body.cpostal.trim():null,
            provincia: req.body.provincia != '' && req.body.provincia != 0 ?req.body.provincia.trim():null,
            localidad: req.body.localidad != '' && req.body.localidad != 0 ?req.body.localidad.trim():null
        }, {
            where: {
                id: req.session.usuario.id
            }
        })
            .then(() => {
                res.redirect('/users/account')
            })
    },
    delete: (req, res) => {
        db.Users.destroy({
            where: {
                id: req.session.usuario.id
            }
        })
            .then(() => {
                req.session.destroy();
                if(req.cookies.userArtisticaDali){
                    res.cookie('userArtisticaDali','',{maxAge:-1})
                }

                res.redirect('/')
            })
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
            msg: 'Coloca el email de tu cuenta para recuperar la contraseña'
        });
    },
    sendEmail: (req, res) => {  //POST QUE ENVIA LA URL AL EMAIL INGRESADO EN EL FORMULARIO
        let email = req.body.email;
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Users.findOne({
                where: {
                    email: email
                }
            })
                .then(user => {
                    let fullUrl = req.protocol + '://' + req.get('host');
                    
                    let mailOptions = {
                        from: 'Artística Dalí <artisticadali@gmail.com>',
                        to: user.email,
                        subject: 'Recupera tu contraseña',
                        html: `<div class="header" style="width:100%;background-color: #fff;padding: 5px;"><div class="img" style="width: 30%;min-width: 140px;max-width: 270px;margin:0 auto"><img src="https://i.postimg.cc/kMbCXbwz/logo.png" alt="Artística Dalí" style="width: 100%;"></div></div><div class="body" style="max-width: 700px;margin: 0 auto;"><h2 style="color:#204051;">Hola ${user.nombre}!</h2><h3 style="text-align: center;color:#204051;">Cambia tu contraseña haciendo click en el siguiente boton:</h3><div class="boton" style="display: flex;flex-wrap: wrap;align-content: center;"><a href="${fullUrl}/users/recover/${user.id}/${user.password.slice(7, 60).split('/').join('')}recover" style="display: inline-block;margin: 0 auto;margin-top: 30px;padding: 8px 15px;font-weight: 500;background-color: #3b6978;text-decoration: none;color: #fff;border: 2px solid #3b6978;border-radius: 50px;transition: all .5s ease;">Cambiar contraseña</a></div></div>`
                    }
            
                    nodemailerTransporter.sendMail(mailOptions, (err, data) => {
                        if(err){
                            res.redirect('/users/recover/sent/error');
                        }else{
                            console.log('email enviado')
                            res.redirect(`/users/recover/sent/${user.id}`)
                        }
                    });
                })
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

        if(userId == 'error'){
            res.render('recoverPass', {
                title: 'Error al enviar el mail',
                msg: 'Lo siento! hubo un error al enviar el mail, intentalo denuevo mas tarde'
            })
        } else{
            db.Users.findByPk(userId)
                .then(user => {
                    res.render('recoverPass', {
                        title: 'Mail enviado',
                        msg: `Hola ${user.nombre}! enviamos un mail a ${user.email}. Sigue los pasos del mail para cambiar tu contraseña.`
                    })
                })
        }
    },
    changePassView: (req, res) => {
        let userId = req.params.id;
        let hash = req.params.hash;

        db.Users.findByPk(userId)
            .then(user => {
                if(hash == (user.password.slice(7, 60).split('/').join('') + 'recover')){
                    res.render('recoverPass', {
                        title: 'Modifica tu contraseña',
                        msg: `${user.nombre}! coloca tu nueva contraseña`
                    });
                } else{
                    res.render('recoverPass', {
                        title: 'Error',
                        msg: 'Los siento! La direccion de recuperación de contraseña no es correcta. Por favor verifica el link del mail o vuelve a hacer todos los pasos.'
                    });
                }
            })
    },
    changePass: (req, res) => {
        let userId = req.params.id;
        let hash = req.params.hash;
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Users.findByPk(userId)
                .then(user => {
                    if(hash == (user.password.slice(7, 60).split('/').join('') + 'recover')){
                        db.Users.update({
                            password: bcrypt.hashSync(req.body.password, 12)
                        }, {
                            where: {
                                id: user.id
                            }
                        })
                            .then(() => {
                                res.redirect('/users/login/recovered');
                            })
                            .catch(err => {
                                res.render('recoverPass', {
                                    title: 'Mail enviado',
                                    msg: `Lo siento! Hubo un error al cambiar la contraseña. Intenta realizar nuevamente todos los pasos`
                                })
                            })
                    }
                })
                .catch(err => {
                    res.render('recoverPass', {
                        title: 'Mail enviado',
                        msg: `Lo siento! Hubo un error al cambiar la contraseña. Intenta realizar nuevamente todos los pasos`
                    })
                })
        } else{
            db.Users.findByPk(userId)
                .then(user => {
                    if(hash == (user.password.slice(7, 60).split('/').join('') + 'recover')){
                        res.render('recoverPass', {
                            title: "Modifica tu contraseña",
                            errors: errors.mapped(),
                            old: req.body,
                            msg: `${user.nombre}! coloca tu nueva contraseña`
                        });
                    }
                })
        }
        
    }
}

