// créons mainteannt le modele component 
// peut on définir une liste de types ? pour le champ categ ?
const validCategs = ["Atoms","Molecules","Organisms","Pages","Layouts"];
const validStatus = ["To do","In progress","Done","Blocked"];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Components', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // garantie que l'id est unique
                autoIncrement: true
            },
            label: {
                type: DataTypes.STRING,
                allowNull: false
            },
            categ: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isCategValid(value) {
                        if(!value) {
                            throw new Error('Le type est obligatoire');
                        }
                        if(!validCategs.includes(value)) {
                            throw new Error(`La categorie ${value} n'est pas une catégorie valide`);
                        }
                    }
                }
            },
            description: {
                type: DataTypes.STRING, // text
                allowNull: false,    
                validate: {
                    notEmpty: {
                        msg: "La description ne doit pas être vide"
                    },
                    notNull: {
                        msg: "Une courte description est requise"
                    },
                    len: {
                        args: [3, 300],
                        msg: "La description doit avoir entre 3 et 300 caractères"
                    }
                }
            },
            status: {
                type: DataTypes.STRING, // boolean
                allowNull: false,
                validate: {
                    isSatusValid(value) {
                        if(!value) {
                            throw new Error('Le statut est obligatoire');
                        }
                        if(!validStatus.includes(value)) {
                            throw new Error(`Le statut ${value} n'est pas un statut valide`);
                        }
                    }
                }
            },
            hasColorSchemeVariant: {
                type: DataTypes.BOOLEAN, // boolean
                allowNull: true,  
                defaultValue: false  
            },
            hasShapeVariant: {
                type: DataTypes.BOOLEAN, // boolean
                allowNull: true,  
                defaultValue: false  
            },
            hasSizeVariant: {
                type: DataTypes.BOOLEAN, // boolean
                allowNull: true,  
                defaultValue: false  
            }
        },{
            timestamps: true, 
            createdAt: 'created',
            updatedAt: false
        })

}