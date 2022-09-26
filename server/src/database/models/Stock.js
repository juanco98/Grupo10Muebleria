module.exports = function (sequelize, dataTypes) {
    let alias = 'Stock';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        available: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        min_alert: {
            type: dataTypes.INTEGER
        },
        id_model: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'stocks',
        timestamps: true
    }

    let Stock = sequelize.define(alias, cols, config);

    Stock.associate = function(models) {
        Stock.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'id_model'
        })
    };

    return Stock;
}