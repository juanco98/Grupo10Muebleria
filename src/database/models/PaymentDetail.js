module.exports = function (sequelize, dataTypes) {
    let alias = 'PaymentDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        information: {
            type: dataTypes.STRING
        },
        reference: {
            type: dataTypes.STRING
        },
        status: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'payment_details',
        timestamps: false
    }

    let PaymentDetail = sequelize.define(alias, cols, config);

    PaymentDetail.associate = function(models) {
        PaymentDetail.hasMany(models.PaymentTransaction, {
            as: 'paymentTransactions',
            foreignKey: 'id_payment_detail'
        })
    };

    return PaymentDetail;
}