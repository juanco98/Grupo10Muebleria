module.exports = function (sequelize, dataTypes) {
    let alias = 'Feature';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        height: {
            type: dataTypes.INTEGER
        },
        width: {
            type: dataTypes.INTEGER
        },
        deep: {
            type: dataTypes.INTEGER
        },
        weight: {
            type: dataTypes.FLOAT
        },
        colors: {
            type: dataTypes.STRING,
            get() {
                return this.getDataValue('colors').split(',')
            },
            set(val) {
               this.setDataValue('colors',val.join(','));
            },
        },
        id_model: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'features',
        timestamps: false
    }

    let Feature = sequelize.define(alias, cols, config);

    Feature.associate = function(models) {
        Feature.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'id_model'
        })
    };

    return Feature;
}