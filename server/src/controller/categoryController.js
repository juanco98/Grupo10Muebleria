const db            = require('../database/models');
const Op            = db.Sequelize.Op;

const categoryController = {
    getAllCategoriesAPI: (req, res) => {
        db.Category.findAll({
            include: [
                {association: 'subCategories',
                    include: [
                        {association: 'products'}
                    ]}
            ]
        }).then((categories) => {
            return res.status(200).json({
                categories: categories,
                quantity: categories.length
            })
        }).catch((err) => {
            console.error(err)
            return res.status(500).json({
                error: err
            })
        })
    }
}

module.exports = categoryController;