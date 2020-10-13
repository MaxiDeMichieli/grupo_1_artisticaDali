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
    }
}