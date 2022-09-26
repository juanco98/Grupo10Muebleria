module.exports = function (sequelize, dataTypes) {
    let alias = 'ProductRoom';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        id_room: {
            type: dataTypes.INTEGER
        },
    }

    let config = {
        tableName: 'products_per_rooms',
        timestamps: false
    }

    let ProductRoom = sequelize.define(alias, cols, config);

    ProductRoom.associate = function(models) {
        ProductRoom.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'id_product'
        })
        ProductRoom.belongsTo(models.Room, {
            as: 'rooms',
            foreignKey: 'id_room'
        })
    };

    return ProductRoom;
}