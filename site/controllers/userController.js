const dbUsers = require('../data/usersDataBase.js');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check,validationResult,body} = require('express-validator');

module.exports = {
    registerView: (req, res) => {
        let successAccount = req.params.id;
        if(successAccount){
            res.render('register', {
                title: 'Inicia sesión',
                success: true
            })
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
            res.send(errors.mapped())
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
    }
}

