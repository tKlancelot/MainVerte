const { Plant } = require('../db/sequelize'); // Importer le modèle Plant    
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des images
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/images');
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/api/plants', auth, upload.single('picture'), (req, res) => {
        const { name, description, hp, cp, types } = req.body;
        let picture = req.body.picture;


        if (req.file) {
            const protocol = req.header('x-forwarded-proto') || req.protocol;
            picture = `${protocol}://${req.get('host')}/images/${req.file.filename}`;
        }


        Plant.create({ name, description, hp, cp, types, picture })
            .then(plantCreated => {
                const message = `La plante ${plantCreated.name} a été ajoutée !`;
                res.json({ message, data: plantCreated });
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message = `La plante ${name} n'a pas été ajoutée !`;
                res.status(500).json({ message, data: error });
            });
    });
};
