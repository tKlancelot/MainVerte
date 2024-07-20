const { Component } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');


module.exports = (app) => {
    app.post('/api/components', auth, (req, res) => {
        const { label, description, categ, status, hasColorSchemeVariant, hasShapeVariant, hasSizeVariant } = req.body;

        Component.create({ label, description, categ, status, hasColorSchemeVariant, hasShapeVariant, hasSizeVariant })
            .then(componentCreated => {
                const message = `Le composant ${componentCreated.label} a été ajouté !`;
                res.json({ message, data: componentCreated });
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message = `Le composant ${label} n'a pas été ajouté !`;
                res.status(500).json({ message, data: error });
            });
    });
};


// {
// 	"label":"Avatars",
// 	"categ":"Molecules",
// 	"description":"desc of avatars",
// 	"status":"To do",
// 	"hasColorSchemeVariant":"true",
// 	"hasShapeVariant":"true",
// 	"hasSizeVariant":"true"
// }


// {
// 	"label":"Buttons",
// 	"categ":"Atoms",
// 	"description":"desc of atoms",
// 	"status":"In progress",
// 	"hasColorSchemeVariant":"true",
// 	"hasShapeVariant":"true",
// 	"hasSizeVariant":"true"
// }