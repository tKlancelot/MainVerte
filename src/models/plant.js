// déclaration des modeles auprès de sequelize
// 1 modèle Sequelize = 1 table SQL 

// export d'une fonction qui prend 2 params (sequelize, DataTypes)
// sequelize représente l'objet de connexion sequelize
// le param datatypes est un objet qui contient les types de donnees
// la méthode define permet de creer une nouvelle table et prend en param le nom de la table et ses colonnes (description)
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
                allowNull: false
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false
            }, 
            cp:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            picture:{
                type: DataTypes.STRING,
                allowNull: false
            },
            types: {
                type: DataTypes.STRING,  
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(','); // renvoie un tableau
                },
                set(types) {
                    this.setDataValue('types', types.join()); // renvoie une chaine
                }
            }
        },{
            timestamps: true, 
            createdAt: 'created',
            updatedAt: false // désactiver la colonne updated , refuse la sauvgarde automatique proposée par sequelize
        })
}