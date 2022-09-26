module.exports = function (sequelize, dataTypes) {
    let alias = 'TransactionDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_transaction: {
            type: dataTypes.INTEGER
        },
        id_model: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'transaction_details',
        timestamps: false
    }

    let TransactionDetail = sequelize.define(alias, cols, config);

    TransactionDetail.associate = function(models) {
        TransactionDetail.belongsTo(models.Transaction, {
            as: 'transaction',
            foreignKey: 'id_transaction'
        })
        TransactionDetail.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'id_model'
        })
    };

    return TransactionDetail;
}