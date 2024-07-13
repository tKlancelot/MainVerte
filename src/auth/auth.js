// custom middleware auth qui vérifie la validité du jeton d'authentification transmis par l'utilisateur

const jwt = require('jsonwebtoken');
const privateKey = require('./private_key');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization; // on recupere l'entete http
    
    if(!authorizationHeader) {
        const message = `L'utilisateur n'a pas fourni son jeton d'authentification`;
        return res.status(401).json({message});
    }
    // le jeton jwt sera échangé dans une entete http nommé authorization 
    const token = authorizationHeader.split(' ')[1]; // on extrait le jeton d'authentification de l'entete http en retirant le terme "Bearer"

    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            const message = `L'utilisateur n'est pas autorisé a accéder a cette ressource`;
            return res.status(401).json({message});
        }   
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide`;
            return res.status(401).json({message});
        } else {
            next();
        }   
    });

}