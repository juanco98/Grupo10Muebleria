module.exports = function (sequelize, dataTypes) {
    let alias = 'PaymentType';
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
        tableName: 'payment_types',
        timestamps: false
    }

    let PaymentType = sequelize.define(alias, cols, config);

    PaymentType.associate = function(models) {
        PaymentType.hasMany(models.PaymentTransaction, {
            as: 'paymentTransactions',
            foreignKey: 'id_payment_type'
        })
    };

    return PaymentType;
}