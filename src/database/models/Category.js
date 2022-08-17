module.exports = function (sequelize, dataTypes) {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'categories',
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.SubCategory, {
            as: 'subCategories',
            foreignKey: 'id_category'
        })
    };

    return Category;
}