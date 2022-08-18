module.exports = function (sequelize, dataTypes) {
    let alias = 'SubCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        id_category: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'subcategories',
        timestamps: false
    }

    let SubCategory = sequelize.define(alias, cols, config);

    SubCategory.associate = function(models) {
        SubCategory.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'id_category'
        })
        SubCategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'id_subcategory'
        })
    };

    return SubCategory;
}