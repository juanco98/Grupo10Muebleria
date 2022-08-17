module.exports = function (sequelize, dataTypes) {
    let alias = 'Rol';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'roles',
        timestamps: false,
    }

    let Rol = sequelize.define(alias, cols, config);

    Rol.associate = function(models) {
        Rol.hasMany(models.User, {
            as: 'users',
            foreignKey: 'id_role'
        })
    };

    return Rol;
}