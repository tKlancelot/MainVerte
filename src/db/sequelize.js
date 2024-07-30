const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const ComponentModel = require('../models/components');
const bcrypt = require('bcryptjs');
// const PlantModel = require('../models/plant');

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

// const Plant = PlantModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Component = ComponentModel(sequelize, DataTypes);


const initDb = async () => {
  try {
      // Synchroniser tous les modèles avec la base de données
      await sequelize.sync({ force: true });

      // Utilisateurs par défaut à ajouter si non existants
      const defaultUsers = [
          { username: 'tarik', password: 'ringover', role: 'super_admin' },
          { username: 'léa', password: 'ringover', role: 'super_admin' },
          { username: 'sophie', password: 'ringover', role: 'contributeur' },
          { username: 'victor', password: 'ringover', role: 'contributeur' },
          { username: 'reader1', password: 'ringover', role: 'lecteur' },
          { username: 'reader2', password: 'ringover', role: 'lecteur' }
      ];

      // Traiter chaque utilisateur par défaut
      for (const user of defaultUsers) {
          // Vérifier si l'utilisateur existe déjà
          const existingUser = await User.findOne({ where: { username: user.username } });

          if (!existingUser) {
              // Hacher le mot de passe
              const hash = await bcrypt.hash(user.password, 10);

              // Créer l'utilisateur
              await User.create({ username: user.username, password: hash, role: user.role });

              console.log(`Utilisateur ${user.username} créé avec succès.`);
          } else {
              console.log(`Utilisateur ${user.username} existe déjà, pas de création nécessaire.`);
          }
      }

      console.log('La base de données a bien été initialisée !');
  } catch (error) {
      console.error('Erreur lors de l\'initialisation de la base de données :', error);
  }
};

module.exports = {
    initDb,User,Component
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