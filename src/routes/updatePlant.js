const { Plant } = require('../db/sequelize'); // importer le model plant   
const { ValidationError, UniqueConstraintError } = require('sequelize'); 
const auth = require('../auth/auth');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des images
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/images'); // Dossier de destination pour les fichiers uploadés
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname)); // Nom du fichier
    }
});
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.put('/api/plants/:id', auth, upload.single('picture'), (req, res) => {
        const id = req.params.id;
        
        // Mise à jour des champs
        const { name, description, hp, cp, types } = req.body;
        let picture = req.body.picture;

        // Si un nouveau fichier est uploadé, on met à jour le champ picture
        if (req.file) {
            picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        } else if (req.body.pictureUrl) {
            picture = req.body.pictureUrl; // URL de l'image existante
        }

        Plant.update({ name, description, hp, cp, types, picture }, {
            where: { id: id }
        })
        .then(_ => {
            return Plant.findByPk(id).then(plant => {
                if(plant === null) {
                    const message = `La plante avec l'id ${id} n'existe pas !`;
                    res.status(404).json({message, data: error});
                } else {
                    const message = `La plante ${plant.name} a été mise à jour !`;
                    res.json({message, data: plant});
                }
            });
        }).catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error});
            }
            if(error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, data: error});
            }
            const message = `La requête a échoué (plante non mise à jour) : ${error}`;
            res.status(500).json({message, data: error});
        });
    });
}



// // route pour update une plante 
// const { Plant } = require('../db/sequelize'); // importer le model plant   
// const { ValidationError , UniqueConstraintError } = require('sequelize'); 
// const auth = require('../auth/auth');

// module.exports = (app) => {
//     app.put('/api/plants/:id', auth, (req, res) => {
//         const id = req.params.id;
//         Plant.update(req.body, {
//             where: { id: id }
//         })
//         .then(_ => {
//             return Plant.findByPk(id).then(plant => {
//                 if(plant === null) {
//                     const message = `la plante ${plant.name} n'existe pas !`;
//                     res.status(404).json({message, data: error});
//                 }
//                 const message = `la plante ${plant.name} a été mise à jour !`;
//                 res.json({message, data: plant});
//             })
//         }).catch(error => {
//             if(error instanceof ValidationError) {
//                 return res.status(400).json({message: error.message, data: error})
//             }
//             if(error instanceof UniqueConstraintError) {
//                 return res.status(400).json({message: error.message, data: error})  
//             }
//             const message = `la requête a echouée (plante non mise à jour) : ${error}`;
//             res.status(500).json({message, data: error});
//         })
//     })  
// }