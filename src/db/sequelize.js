const { Sequelize, DataTypes } = require('sequelize');
const PlantModel = require('../models/plant');
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

// du calme il va expliquer tout ça !!! 

if(process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize('tx9e9vfqo06bj9qb', 'pngs5j9c9qpfaopa', 'dwxd1ndnc1esbrx9', {
      host: 'u3r5w4ayhxzdrw87.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Etc/GMT-2',
      },
      logging: true
    })
  } else {
    sequelize = new Sequelize('glasshouse', 'root', '', {
      host: 'localhost',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Etc/GMT-2',
      },
      logging: true
    })
    
  }
  


sequelize.authenticate()
.then(() => { console.log('Connection has been established successfully.');})
.catch(err => { console.error('Unable to connect to the database:', err);});

const Plant = PlantModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {


    // {force: false} permet de supprimer la base de données et de la recreer
    return sequelize.sync()
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

// bcrypt.hash('tarik', 10)
//     .then(hash => User.create({ username: 'tarik',password: hash})
//     .then(user => console.log(user.toJSON()))
//     .catch(error => console.error(error)))