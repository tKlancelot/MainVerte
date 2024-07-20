const { Op } = require('sequelize');
const { Component } = require('../db/sequelize'); // importer le modèle Component
const auth = require('../auth/auth');

module.exports = (app) => {


    app.get('/api/components', auth, (req, res) => {

        const orderby = req.query.orderby || 'label';
        const order = req.query.order || 'ASC';

        if (req.query.label) {
            const label = req.query.label;
            const limit = parseInt(req.query.limit) || 5;
            if (label.length < 2) {
                const message = 'La recherche doit contenir au moins deux lettres';
                res.status(400).json({ message });
                return;
            }
            return Plant.findAndCountAll({
                where: {
                    label: {
                        [Op.like]: `%${label}%`
                    }
                },
                order: [[orderby, order]],
                limit: limit
            })
                .then(({ count, rows }) => {
                    const message = `Il y a ${count} composant(s) correspondant au terme de recherche ${label}!`;
                    res.json({ message, data: rows }); // spécifié par express
                });
        } else {
            Component.findAll({ order: [[orderby, order]] }) // Tri par le paramètre orderby et l'ordre
                .then(components => {
                    const message = 'Tous les composants ont bien été récupérées !';
                    res.json({ message, data: components });
                })
                .catch(error => {
                    const message = `La requête a échoué : ${error}`;
                    res.status(500).json({ message, data: error }); // méthode status
                });
        }
    });
};
