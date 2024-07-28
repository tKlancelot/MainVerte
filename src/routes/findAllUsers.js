// route findAllUsers 
const { User } = require('../db/sequelize'); // importer le model user
const auth = require('../auth/auth');   

module.exports = (app) => {
    app.get('/api/users', auth, (req, res) => {
        User.findAll()
            .then(users => {
                const message = 'La liste des utilisateurs a été trouvé !';
                res.json({ message, data: users })
            })
            .catch(error => {
                const message = `La liste des utilisateurs n'a pas été trouvé : ${error}`;
                res.status(500).json({ message })
            })
    })
}   