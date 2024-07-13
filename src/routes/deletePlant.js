// route pour delete une plante 
const { Plant } = require('../db/sequelize'); // importer le model plant    
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/plants/:id', auth, (req, res) => {
        Plant.findByPk(req.params.id).then(plant => {
            if(plant === null) { 
                const message = `la plante ${plant.name} n'existe pas !`;
                res.status(404).json({message, data: error});
            }          
            const PlantDeleted = plant; 
            return Plant.destroy({ // méthode sequelize pour supprimer 
                where: { id: plant.id }
            })
            .then(_ => {
                const message = `la plante ${PlantDeleted.name} a été supprimée !`;
                res.json({message, data: PlantDeleted});
            })
        }).catch(error => {
            const message = `la requête a echouée (plante non supprimée) : ${error}`;
            res.status(500).json({message, data: error});
        })
    })  
}