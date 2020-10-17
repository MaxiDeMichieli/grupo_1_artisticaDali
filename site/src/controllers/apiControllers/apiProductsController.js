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
            producto_id: producto
        })
        .then(resultado => {
            res.json(resultado);
        })
        .then(err => {
            console.log(err);
        })
    }
}