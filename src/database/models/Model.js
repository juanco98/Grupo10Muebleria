module.exports = function (sequelize, dataTypes) {
    let alias = 'Model';
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
        img: {
            type: dataTypes.STRING
        },
        images: {
            type: dataTypes.STRING,
            get() {
                return this.getDataValue('images').split(',')
            },
            set(val) {
               this.setDataValue('images',val.join(','));
            },
        },
        active: {
            type: dataTypes.BOOLEAN
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'models',
        timestamps: false
    }

    let Model = sequelize.define(alias, cols, config);

    Model.associate = function(models) {
        Model.belongsToMany(models.User, {
            as: "favoritesUsers",
            through: "favorites",
            foreignKey: "id_model",
            otherKey: "id_user",
            timestamps: false
        })
        Model.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'id_product'
        })
        Model.hasOne(models.Property, {
            as: 'property',
            foreignKey: 'id_model'
        })
        Model.hasOne(models.Feature, {
            as: 'feature',
            foreignKey: 'id_model'
        })
        Model.hasOne(models.Stock, {
            as: 'stock',
            foreignKey: 'id_model'
        })
        Model.hasMany(models.Price, {
            as: 'prices',
            foreignKey: 'id_model'
        })
        Model.hasMany(models.TransactionDetail, {
            as: 'transactionDetails',
            foreignKey: 'id_model'
        })
    };

    return Model;
}