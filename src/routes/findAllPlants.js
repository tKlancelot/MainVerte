const { Op } = require('sequelize');
const { Plant } = require('../db/sequelize'); // Importer le modèle Plant
const auth = require('../auth/auth');

module.exports = (app) => {
    // express nous permet de passer en deuxieme argument notre middleware custom auth 
    app.get('/api/plants', auth, (req, res) => {
        
        const order = req.query.order || 'name'; // Paramètre de tri par défaut sur 'name'
        
        if(req.query.name) {
            // Paramètre de recherche par name
            const name = req.query.name; // Permet d'indiquer à express que l'on souhaite extraire le paramètre de requête name de l'URL 
            // Récupérer le paramètre de limite fixé par l'utilisateur
            const limit = parseInt(req.query.limit) || 5;
            // Prendre en compte la recherche à partir de deux lettres minimum 
            if(name.length < 2) {
                const message = 'La recherche doit contenir au moins deux lettres';
                res.status(400).json({message});
                return;
            }
            return Plant.findAndCountAll({
                where: { 
                    name: { // name est le nom de la colonne dans la bdd
                        [Op.like]: `%${name}%` // name est le critère de recherche
                    }
                },
                order: [[order, 'ASC']], // Permet de trier par le paramètre spécifié
                limit: limit // Permet de limiter le nombre de résultats retournés dans la requête
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} plante(s) correspondant au terme de recherche ${name}!`;
                res.json({message, data: rows}); // spécifié par express
            });
        } else {
            Plant.findAll({order: [[order, 'ASC']]})
            .then(plants => {
                const message = 'Toutes les plantes ont bien été récupérées !';
                res.json({message, data: plants}); // méthode fournie par express
            })
            .catch(error => { // méthode pour intercepter les erreurs (promesses js)
                const message = `La requête a échoué : ${error}`;
                res.status(500).json({message, data: error}); // méthode status
            });
        }
    });
}
