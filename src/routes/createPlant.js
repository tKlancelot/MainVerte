// route pour ajouter une plante 
const { Plant } = require('../db/sequelize'); // importer le model plant    
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/api/plants', auth, (req, res) => {
        const plant = req.body;
        Plant.create(plant)
        .then(plantCreated => {
            const message = `la plante ${plantCreated.name} a été ajoutée !`;
            res.json({message, data: plantCreated}); // spécifie par express
        }).catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error})
            }
            if(error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, data: error})  
            }
            const message = `la plante ${plant.name} n'a pas été ajoutée !`;
            res.status(500).json({message, data: error});
        })
    })  
}