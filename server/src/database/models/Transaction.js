module.exports = function (sequelize, dataTypes) {
    let alias = 'Transaction';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER
        },
        id_address: {
            type: dataTypes.INTEGER
        },
        total: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'transactions',
        timestamps: true
    }

    let Transaction = sequelize.define(alias, cols, config);

    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Address, {
            as: 'address',
            foreignKey: 'id_address'
        })
        Transaction.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id_user'
        })
        Transaction.hasMany(models.TransactionDetail, {
            as: 'transactionDetails',
            foreignKey: 'id_transaction'
        })
        Transaction.hasOne(models.PaymentTransaction, {
            as: 'paymentTransaction',
            foreignKey: 'id_transaction'
        })
    };

    return Transaction;
}