const { User } = require('../db/sequelize'); // importer le model user
const bcrypt = require('bcryptjs'); // importer bcrypt

module.exports = (app) => {
    app.post('/api/users', (req, res) => {
        const { username, password } = req.body;

        // Vérifiez si l'utilisateur existe déjà
        User.findOne({ where: { username } })
            .then(user => {
                if (user) {
                    const message = "Le nom d'utilisateur est déjà pris.";
                    return res.status(400).json({ message });
                } 

                // Si l'utilisateur n'existe pas, créez un nouvel utilisateur
                bcrypt.hash(password, 10).then(hash => {
                    User.create({ username, password: hash })
                        .then(newUser => {
                            const message = `L'utilisateur ${newUser.username} a été créé !`;
                            res.json({ message, data: newUser });
                        })
                        .catch(error => {
                            const message = `L'utilisateur n'a pas pu être créé. Réessayez dans quelques secondes !`;
                            res.status(500).json({ message, data: error });
                        });
                });
            })
            .catch(error => {
                const message = `Une erreur s'est produite lors de la vérification de l'utilisateur. Réessayez dans quelques secondes !`;
                res.status(500).json({ message, data: error });
            });
    });
}
