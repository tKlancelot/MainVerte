// déclaration des modeles auprès de sequelize
// 1 modèle Sequelize = 1 table SQL 

// export d'une fonction qui prend 2 params (sequelize, DataTypes)
// sequelize représente l'objet de connexion sequelize
// le param datatypes est un objet qui contient les types de donnees
// la méthode define permet de creer une nouvelle table et prend en param le nom de la table et ses colonnes (description)

// les validateurs sont attachées à deux méthodes : CREATE et UPDATE
// les contraintes = mécanisme de validation coté SQL

const validTypes = ["Fleurs", "Feuilles", "Graines", "Verte", "Intérieur","Arbustes"];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Plants', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // garantie que l'id est unique
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false, // JavaScript validator and SQL constraint
                unique: true,
                validate: {
                    notEmpty: {
                        msg: "Le nom ne doit pas être vide"
                    },
                    notNull: {
                        msg: "Le nom est une propriété requise"
                    },
                    len: {
                        args: [3, 25],
                        msg: "Le nom doit avoir entre 3 et 25 caractères"
                    }
                }
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utiliser uniquement des nombres entiers pour les points de vie" },
                    notNull: { msg: "Points de vie obligatoire" },
                    max: { 
                        args: [999], 
                        msg: "Le maximum de points de vie est 999" 
                    },
                    min: { 
                        args: [1], 
                        msg: "Le minimum de points de vie est 1" 
                    },
                }
            }, 
            cp:{
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utiliser uniquement des nombres entiers pour les points de cp" },
                    notNull: { msg: "Points de cp obligatoire" },
                    max: { 
                        args: [99], 
                        msg: "Le maximum de points de cp est 99" 
                    },
                    min: { 
                        args: [1], 
                        msg: "Le minimum de points de cp est 1" 
                    },
                }
            },
            picture:{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "L'image est obligatoire" },
                    isUrl: { msg: "L'image doit être une url valide" }
                }
            },
            types: {
                type: DataTypes.STRING,  
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(','); // renvoie un tableau
                },
                set(types) {
                    this.setDataValue('types', types.join()); // renvoie une chaine
                },
                validate: {
                    isTypesValid(value) {
                        if(!value) {
                            throw new Error('Le tableau des types est obligatoire');
                        }
                        if(value.split(',').length > 3) {
                            throw new Error('Le tableau des types ne doit pas avoir plus de 3 types');
                        }
                        value.split(',').forEach(type => {
                            if(!validTypes.includes(type)) {
                                throw new Error(`Le type ${type} n'est pas un type valide`);
                            }
                        })
                    }
                }
            }
        },{
            timestamps: true, 
            createdAt: 'created',
            updatedAt: false // désactiver la colonne updated , refuse la sauvgarde automatique proposée par sequelize
        })
}