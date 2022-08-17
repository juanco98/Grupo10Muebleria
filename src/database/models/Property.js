module.exports = function (sequelize, dataTypes) {
    let alias = 'Property';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wood: {
            type: dataTypes.STRING,
            get() {
                return this.getDataValue('wood').split(',')
            },
            set(val) {
               this.setDataValue('wood',val.join(','));
            },
        },
        metal: {
            type: dataTypes.STRING,
            get() {
                return this.getDataValue('metal').split(',')
            },
            set(val) {
               this.setDataValue('metal',val.join(','));
            },
        },
        cloth: {
            type: dataTypes.STRING,
            get() {
                return this.getDataValue('cloth').split(',')
            },
            set(val) {
               this.setDataValue('cloth',val.join(','));
            },
        },
        other: {
            type: dataTypes.STRING,
            get() {
                return this.getDataValue('other').split(',')
            },
            set(val) {
               this.setDataValue('other',val.join(','));
            },
        },
        id_model: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'properties',
        timestamps: false
    }

    let Property = sequelize.define(alias, cols, config);

    Property.associate = function(models) {
        Property.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'id_model'
        })
    };

    return Property;
}