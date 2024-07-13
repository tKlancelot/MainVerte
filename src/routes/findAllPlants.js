// route findallplants 
const { Op } = require('sequelize');
const { Plant } = require('../db/sequelize'); // importer le model plant
const auth = require('../auth/auth');


module.exports = (app) => {

    // express nous permet de passer en deuxieme argument notre middleware custom auth 
    app.get('/api/plants', auth, (req, res) => {
    
        if(req.query.name) {
            // rajouter un parametre de recherche par name
            const name = req.query.name; // permet d'indiquer a express que l'on souhaite extraire le parametre de requête name de l'url 
            // recuperer le parametre de limite fixé par l'utilisateur
            const limit = parseInt(req.query.limit) || 5;
            // prendre en compte la recherche a partir de deux lettres minimum 
            if(name.length < 2) {
                const message = 'la recherche doit contenir au moins deux lettres';
                res.status(400).json({message});
                return;
            }
            return Plant.findAndCountAll({
                where: { 
                    name: { // name est le nom de la colonne dans la bdd
                        [Op.like]: `%${name}%` // name est le critère de recherche
                    }
                },
                order: ['name'], // Permet de trier par ordre alphabétique
                limit: limit // permet de limiter le nombre de resultat retourne dans la requête
            })
            .then(({count, rows}) => {
                const message = `Il y ${count} plante(s) correspondant au terme de recherche ${name}!`;
                res.json({message, data: rows}); // spécifie par express
            })
        } else {
        Plant.findAll({order: ['name']})
        .then(plants => {
            const message = 'Toutes les plantes ont bien été recuperées !';
            res.json({message, data: plants}); // méthode fournie par express
        })
        .catch(error => { // methode pour intercepter les erreurs (promesses js)
            const message = `la requête a echouée : ${error}`;
            res.status(500).json({message, data: error}); // méthode status
        })
        }
    })  

}
