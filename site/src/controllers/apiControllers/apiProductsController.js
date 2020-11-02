const db = require('../../database/models')
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const {Op} = require('sequelize')


module.exports = {
    subcategories: (req, res) => {
        let categoriaId = req.params.category;

        db.Categories.findOne({
            where: {
                id: categoriaId
            },
            include: [
                {association: 'subcategorias'}
            ]
        })
        .then(resultado => {
            res.json(resultado)
        })
    },
    addCart: (req, res) => {
        let producto = req.params.prod;
        let cantidad = req.params.cantidad;

        db.Carts.create({
            usuario_id: req.session.usuario.id,
            producto_id: producto,
            cantidad: cantidad
        })
        .then(resultado => {
            res.json(resultado);
        })
        .then(err => {
            console.log(err);
        })
    },
    removeCart: (req, res) => {
        let producto = req.params.prod;

        db.Carts.destroy({
            where: {
                producto_id: producto,
                usuario_id: req.session.usuario.id
            }
        })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json(err)
        })
    },
    cartProducts: (req, res) => {
        db.Carts.findAll({
            where: {
                usuario_id: req.session.usuario.id
            },
            include: [{association: 'producto',
                include: [{association: 'imagenes'}]
            }]
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    },
    cartCantidad: (req, res) => {
        let cantidad = req.params.cant;
        let producto = req.params.prod;

        db.Carts.update({
            cantidad: cantidad
        }, {
            where: {
                producto_id: producto
            }
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    }
}