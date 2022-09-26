module.exports = function (sequelize, dataTypes) {
    let alias = 'Discount';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        percentage: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'discounts',
        timestamps: false
    }

    let Discount = sequelize.define(alias, cols, config);

    Discount.associate = function(models) {
        Discount.hasMany(models.Price, {
            as: 'prices',
            foreignKey: 'id_discount'
        })
    };

    return Discount;
}