const { Sequelize, DataTypes } = require('sequelize');
const PlantModel = require('../models/plant');
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

// du calme il va expliquer tout ça !!! 

const sequelize = new Sequelize(
    process.env.DB_NAME || 'glasshouse',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
);
    

sequelize.authenticate()
.then(() => { console.log('Connection has been established successfully.');})
.catch(err => { console.error('Unable to connect to the database:', err);});

const Plant = PlantModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {


    return sequelize.sync({force: false})
    .then(_ => {
        console.log('la base de données ' + sequelize.config.database + ' est synchronisee');
        // ajouter des plantes à la base de données (équivalent des fixtures)
        
        // if le user n'existe pas 
        if(!User.findOne({ where: { username: 'tarik' } })) {
            return bcrypt.hash('tarik', 10)
                .then(hash => User.create({ username: 'tarik', password: hash})
                .then(user => console.log(user.toJSON()))
                .catch(error => console.error(error)))
        }
        // bcrypt.hash('tarik', 10)
        //     .then(hash => User.create({ username: 'tarik',password: hash})
        //     .then(user => console.log(user.toJSON()))
        //     .catch(error => console.error(error)))

    })
}
module.exports = {
    initDb,Plant,User
}

// NOTE 
// creer une instance de Sequelize
// interet -> intéragir avec la base de donnée en manipulant de simples objets javascript 
// sequelize repose sur le concept de model (Models) -> abstraction qui représente une table de notre bdd
// objet javascript spécifique fourni par sequelize et décrit la structure de l'entité
// nous devons donner un nom à chaque modèle crée - sequelize ajoute un "s" à la fin

// sequelize nous donne le pouvoir de piloter notre bdd avec du code javascript

// plants.map(plant => {
//    Plant.create({
//        name : plant.name,
//        hp : plant.hp,
//        cp : plant.cp,
//        picture : plant.picture,
//        types: plant.types,   
//    }).then(myPlant => console.log(myPlant.toJSON()));
// }) 