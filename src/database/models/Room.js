module.exports = function (sequelize, dataTypes) {
    let alias = 'Room';
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
        tableName: 'rooms',
        timestamps: false
    }

    let Room = sequelize.define(alias, cols, config);

    Room.associate = function(models) {
        Room.belongsToMany(models.Product, {
            as: "products",
            through: "products_per_rooms",
            foreignKey: "id_room",
            otherKey: "id_product",
            timestamps: false
        })
    };

    return Room;
}