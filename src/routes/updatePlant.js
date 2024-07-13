// route pour update une plante 
const { Plant } = require('../db/sequelize'); // importer le model plant   
const { ValidationError , UniqueConstraintError } = require('sequelize'); 
const auth = require('../auth/auth');

module.exports = (app) => {
    app.put('/api/plants/:id', auth, (req, res) => {
        const id = req.params.id;
        Plant.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Plant.findByPk(id).then(plant => {
                if(plant === null) {
                    const message = `la plante ${plant.name} n'existe pas !`;
                    res.status(404).json({message, data: error});
                }
                const message = `la plante ${plant.name} a été mise à jour !`;
                res.json({message, data: plant});
            })
        }).catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error})
            }
            if(error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, data: error})  
            }
            const message = `la requête a echouée (plante non mise à jour) : ${error}`;
            res.status(500).json({message, data: error});
        })
    })  
}