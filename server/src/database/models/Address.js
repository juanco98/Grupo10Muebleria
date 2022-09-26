module.exports = function (sequelize, dataTypes) {
    let alias = 'Address';
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
        },
        city: {
            type: dataTypes.STRING
        },
        state: {
            type: dataTypes.STRING
        },
        postal_code: {
            type: dataTypes.INTEGER
        },
        address: {
            type: dataTypes.STRING
        },
        number_address: {
            type: dataTypes.INTEGER
        },
        number_floor: {
            type: dataTypes.STRING
        },
        number_apartment: {
            type: dataTypes.STRING
        },
        active: {
            type: dataTypes.BOOLEAN
        },
        id_user: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'addresses',
        timestamps: false
    }

    let Address = sequelize.define(alias, cols, config)

    Address.associate = function(models) {
        Address.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id_user'
        })
        Address.hasMany(models.Transaction, {
            as: 'transactions',
            foreignKey: 'id_address'
        })
    };

    return Address;
}