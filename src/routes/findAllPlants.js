// route findallplants 
const { Plant } = require('../db/sequelize'); // importer le model plant

module.exports = (app) => {
    app.get('/api/plants', (req, res) => {
        Plant.findAll()
        .then(plants => {
            const message = 'Toutes les plantes ont bien été recuperées !';
            res.json({message, data: plants}); // méthode fournie par express
        })
        .catch(error => { // methode pour intercepter les erreurs (promesses js)
            const message = `la requête a echouée : ${error}`;
            res.status(500).json({message, data: error}); // méthode status
        })
    })  
}
