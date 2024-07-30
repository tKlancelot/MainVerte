// nous devons maintenant comparer des identifiants externes a notre api envoyée par les consommateurs avec des identifiants présents dans notre base
// nous avons besoin d'un modele user afin de comparer
// ainsi nous serons donc capable de déterminer si tel user est autorisé a accéder à notre api rest

// ce qu'il faut retenir : l'identifiant de connexion doit être unique (uniques dans la base de données)

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: {
                    msg: "Le nom d'utilisateur est déja pris"
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                hashPassword: true
            },
            role: {
                type: DataTypes.ENUM('super_admin', 'contributeur', 'lecteur'),
                defaultValue: 'lecteur',
                allowNull: false,
            }
        }
    )
}   