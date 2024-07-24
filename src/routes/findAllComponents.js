const { Op } = require('sequelize');
const { Component } = require('../db/sequelize'); // importer le modèle Component

module.exports = (app) => {
    app.get('/api/components', (req, res) => {
        const orderby = req.query.orderby || 'label';
        const order = req.query.order || 'ASC';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Initialize an object to hold query conditions
        const conditions = {};

        // Add label filter if provided
        if (req.query.label) {
            const label = req.query.label;
            if (label.length < 2) {
                const message = 'La recherche doit contenir au moins deux lettres';
                return res.status(400).json({ message });
            }
            conditions.label = {
                [Op.like]: `%${label}%`
            };
        }

        // Add status filter if provided
        if (req.query.status) {
            conditions.status = req.query.status;
        }

        // Add categ filter if provided
        if (req.query.categ) {
            conditions.categ = req.query.categ;
        }

        // Use findAndCountAll to support pagination and counting
        Component.findAndCountAll({
            where: conditions,
            order: [[orderby, order]],
            limit: limit,
            offset: offset
        })
            .then(({ count, rows }) => {
                const message = `Il y a ${count} composant(s) correspondant aux critères de recherche !`;
                const totalPages = Math.ceil(count / limit);
                res.json({ message, data: rows, totalPages: totalPages, currentPage: page });
            })
            .catch(error => {
                const message = `La requête a échoué : ${error}`;
                res.status(500).json({ message, data: error });
            });
    });
};
