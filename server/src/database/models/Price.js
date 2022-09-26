module.exports = function (sequelize, dataTypes) {
    let alias = 'Price';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: dataTypes.INTEGER
        },
        active: {
            type: dataTypes.BOOLEAN
        },
        id_model: {
            type: dataTypes.INTEGER
        },
        id_discount: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'prices',
        timestamps: true
    }

    let Price = sequelize.define(alias, cols, config);

    Price.associate = function(models) {
        Price.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'id_model'
        })
        Price.belongsTo(models.Discount, {
            as: 'discount',
            foreignKey: 'id_discount'
        })
    };

    return Price;
}