const { User } = require('../db/sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {

            if(!user) { 
                const message = `L'utilisateur ${req.body.username} n'existe pas !`;
                res.status(404).json({message});
                return;
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => { // méthode compare permettant de comparer le mdp saisi par le user avec celui de la bdd . la méthode retourne une promesse
                if(!isPasswordValid) {
                    const message = `Le mot de passe est incorrect !`;
                    res.status(401).json({message});
                    return;
                }

                // JWT 
                const token = jwt.sign(
                    { userId: user.id, }, 
                    privateKey, 
                    { expiresIn: '24h' }
                );
                

                const message = `L'utilisateur ${req.body.username} a bien ete connecté !`;
                res.json({message, data: user, token});
            })
        }).catch(error => {
            const message = `L'utilisateur n'a pas pu être connecté. Reessayez dans quelques secondes !`;
            res.status(500).json({message, data: error});
        })
    })
}