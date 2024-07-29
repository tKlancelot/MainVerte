// route createUser 
const { User } = require('../db/sequelize'); // importer le model user
// const auth = require('../auth/auth');   
const bcrypt = require('bcryptjs'); // importer bcrypt


module.exports = (app) => {
    app.post('/api/users',  (req, res) => {
        const { username, password } = req.body;
        bcrypt.hash(password, 10).then((hash) => {
            User.create({ username, password: hash }).then((user) => {
                const message = `L'utilisateur ${user.username} a été créé !`;
                res.json({ message, data: user });
            })
        })
        .catch((error) => {
            const message = `L'utilisateur n'a pas été créé. Reessayez dans quelques secondes !`;
            res.status(500).json({ message, data: error }); 
        })
    })
}