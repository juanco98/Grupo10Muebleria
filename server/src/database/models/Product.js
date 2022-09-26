module.exports = function (sequelize, dataTypes) {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        brand: {
            type: dataTypes.STRING
        },
        active: {
            type: dataTypes.BOOLEAN
        },
        id_user: {
            type: dataTypes.INTEGER
        },
        id_subcategory: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'products',
        timestamps: true
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id_user'
        })
        Product.hasMany(models.Model, {
            as: 'models',
            foreignKey: 'id_product'
        })
        Product.belongsToMany(models.Room, {
            as: "rooms",
            through: "products_per_rooms",
            foreignKey: "id_product",
            otherKey: "id_room",
            timestamps: false
        })
        Product.belongsTo(models.SubCategory, {
            as: 'subCategory',
            foreignKey: 'id_subcategory'
        })
    };

    return Product;
}