// route  findonecomponent
const { Component } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/components/:id', auth, (req, res) => {
        const id = req.params.id;
        Component.findByPk(id)
        .then(component => {
            const message = `le composant ${component.label} a été recuperé !`;
            res.json({message, data: component});
        })
        .catch(error => {
            const message = `la requête a echoué (composant non récupéré) : ${error}`;
            res.status(500).json({message, data: error});
        })
    })  
}