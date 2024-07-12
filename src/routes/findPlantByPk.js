// route  findoneplant 
const { Plant } = require('../db/sequelize'); // importer le model plant

module.exports = (app) => {
    app.get('/api/plants/:id', (req, res) => {
        const id = req.params.id;
        Plant.findByPk(id) // signifie "trouver la plante par son id" = find by primary key. Pas besoin de converter l'id en string
        .then(plant => {
            const message = `la plante ${plant.name} a été recuperée !`;
            res.json({message, data: plant}); // spécifie par express
        })
        .catch(error => {
            const message = `la requête a echouée (plante non récupérée) : ${error}`;
            res.status(500).json({message, data: error});
        })
    })  
}