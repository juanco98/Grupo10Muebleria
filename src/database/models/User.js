module.exports = function (sequelize, dataTypes) {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        born_date: {
            type: dataTypes.DATEONLY
        },
        email: {
            type: dataTypes.STRING
        },
        user: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        active: {
            type: dataTypes.BOOLEAN
        },
        id_role: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'users',
        timestamps: true
    }

    let User = sequelize.define(alias, cols, config)

    User.associate = function(models) {
        User.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'id_role'
        })
        User.hasMany(models.Address, {
            as: 'addresses',
            foreignKey: 'id_user'
        })
        User.hasMany(models.Transaction, {
            as: 'transactions',
            foreignKey: 'id_user'
        })
        User.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'id_user'
        })
        User.belongsToMany(models.Model, {
            as: "favoritesModels",
            through: "favorites",
            foreignKey: "id_user",
            otherKey: "id_model",
            timestamps: false
        })
    };

    return User;
}