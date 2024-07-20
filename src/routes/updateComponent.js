const { Component } = require('../db/sequelize');  
const { ValidationError , UniqueConstraintError } = require('sequelize'); 
const auth = require('../auth/auth');

module.exports = (app) => {
    app.put('/api/components/:id', auth, (req, res) => {
        const id = req.params.id;
        Component.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Component.findByPk(id).then(cpt => {
                if(cpt === null) {
                    const message = `le composant ${cpt.name} n'existe pas !`;
                    res.status(404).json({message, data: error});
                }
                const message = `le composant ${cpt.name} a été mise à jour !`;
                res.json({message, data: cpt});
            })
        }).catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error})
            }
            if(error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, data: error})  
            }
            const message = `la requête a echouée (composant non mis à jour) : ${error}`;
            res.status(500).json({message, data: error});
        })
    })  
}