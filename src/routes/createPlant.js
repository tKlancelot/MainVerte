// route pour ajouter une plante 
const { Plant } = require('../db/sequelize'); // importer le model plant    

module.exports = (app) => {
    app.post('/api/plants', (req, res) => {
        const plant = req.body;
        // si le user post plus de 3 types de plante
        // erreur logique métier 
        // if (Object.keys(plant).length > 3) {
        //     const message = `la plante ${plant.name} n'a pas été ajoutée !`;
        //     res.status(500).json({message, data: error});
        // }
        Plant.create(plant)
        .then(plantCreated => {
            const message = `la plante ${plantCreated.name} a été ajoutée !`;
            res.json({message, data: plantCreated}); // spécifie par express
        }).catch(error => {
            const message = `la plante ${plant.name} n'a pas été ajoutée !`;
            res.status(500).json({message, data: error});
        })
    })  
}