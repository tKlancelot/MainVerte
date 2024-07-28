// route findUserByPk 
const { User } = require('../db/sequelize'); // importer le model user
const auth = require('../auth/auth');   

module.exports = (app) => {
    app.get('/api/users/:id', auth, (req, res) => {
        const id = req.params.id;
        User.findByPk(id).then(user => {
            if(user === null) {
                const message = `l'utilisateur ${user.username} n'existe pas !`;
                res.status(404).json({message, data: error});
            }
            const message = `l'utilisateur ${user.username} a été trouvé !`;
            res.json({message, data: user});
        })
    })
}