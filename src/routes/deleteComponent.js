const { Component } = require('../db/sequelize');    
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/components/:id', auth, (req, res) => {
        Component.findByPk(req.params.id).then(cpt => {
            if(cpt === null) { 
                const message = `le composant ${cpt.label} n'existe pas !`;
                res.status(404).json({message, data: error});
            }          
            const CptDeleted = cpt; 
            return Component.destroy({ // méthode sequelize pour supprimer 
                where: { id: cpt.id }
            })
            .then(_ => {
                const message = `le composant ${CptDeleted.label} a été supprimé !`;
                res.json({message, data: CptDeleted});
            })
        }).catch(error => {
            const message = `la requête a echouée (composant non supprimé) : ${error}`;
            res.status(500).json({message, data: error});
        })
    })  
}