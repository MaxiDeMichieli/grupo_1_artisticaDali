const dbUsers = require('../data/usersDatabase');
const fs = require('fs');
const path = require('path')

module.exports = {
    registerView: (req, res) => {
        res.render('register', {
            title: 'Formulario de registro'
        });
    },
    register: (req, res, next) => {
        let newUser = {
            id: dbUsers.length + 1,
            nombre: req.body.nombre.trim(),
            apellido: req.body.apellido.trim(),
            email: req.body.email.trim(),
            password: req.body.password,
            telefono: null,
            calle: null,
            numero: null,
            dpto: null,
            cpostal: null,
            provincia: null,
            localidad: null,
        }

        dbUsers.push(newUser);

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'usersDataBase.json'), JSON.stringify(dbUsers), 'utf-8');

        res.redirect('/users/account')
    },
    account: (req, res) => {
        res.render('account', {
            title: 'Mi cuenta',
            user: dbUsers[dbUsers.length - 1]
        })
    },
    editView: (req, res) => {
        res.render('editAccount', {
            title: 'Editar mis datos',
            user: dbUsers[dbUsers.length - 1]
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

        fs.writeFileSync(path.join(__dirname, '../data/usersDataBase.json'), JSON.stringify(dbUsers))
        res.redirect('/users/account')
    }
}

