module.exports = function (sequelize, dataTypes) {
    let alias = 'PaymentTransaction';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_transaction: {
            type: dataTypes.INTEGER
        },
        id_payment_type: {
            type: dataTypes.INTEGER
        },
        id_payment_detail: {
            type: dataTypes.INTEGER
        },
    }

    let config = {
        tableName: 'payment_transactions',
        timestamps: false
    }

    let PaymentTransaction = sequelize.define(alias, cols, config);

    PaymentTransaction.associate = function(models) {
        PaymentTransaction.belongsTo(models.Transaction, {
            as: 'transaction',
            foreignKey: 'id_transaction'
        })
        PaymentTransaction.belongsTo(models.PaymentType, {
            as: 'paymentType',
            foreignKey: 'id_payment_type'
        })
        PaymentTransaction.belongsTo(models.PaymentDetail, {
            as: 'paymentDetail',
            foreignKey: 'id_payment_detail'
        })
    };

    return PaymentTransaction;
}