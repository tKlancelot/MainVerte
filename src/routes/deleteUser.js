// route deleteUser 
const { User } = require('../db/sequelize'); // importer le model user
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/users/:id', auth, (req, res) => {
        User.findByPk(req.params.id).then(user => {
            const message = `l'utilisateur ${user.username} a été supprimé !`;
            user.destroy();
            res.json({message, data: user});
        })
        .catch(error => {
            const message = `la requête a echouée (utilisateur non supprimé) : ${error}`;
            res.status(500).json({message, data: error});
        })
    })


}