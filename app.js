const express = require('express')
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importer le middleware cors
let title = "projet main verte !!";
const sequelize = require('./src/db/sequelize');



// va chercher express dans node_module 
// instance de express définit le port du server web 
const app = express()
// const port = process.env.PORT || 3000
const port = 3000

// Utiliser le middleware cors pour permettre les requêtes cross-origin
app.use(cors());

// Servir les fichiers statiques dans le dossier "public"
app.use(express.static('public'));

// add a favicon to our api rest
app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb();

// ici on ajoute nos futurs points de terminaisons
// CHAINE DE TRAITEMENT DE LA REQUET HTTP
// requete http client --> API RESET --> Appel à la base de données --> reponse HTTP

const findallplants = require('./src/routes/findAllPlants');
findallplants(app);
// require('./src/routes/findAllPlants')(app);

require('./src/routes/findPlantByPk')(app);
require('./src/routes/createPlant')(app);
require('./src/routes/updatePlant')(app);
require('./src/routes/deletePlant')(app);

// Gestion des erreurs 404 par express
app.use((req, res, next) => {
    const message = `la ressource ${req.originalUrl} n'a pas été trouvée`;
    res.status(404).json({message});
})

app.listen(port, () => { console.debug(`notre app ${title} listening on :${port}`);});


// on a mis en place un backend complet -> 
// un server dev avec node.js + 
// une api rest réalisée avec express + 
// directement reliée a une base de données mysql