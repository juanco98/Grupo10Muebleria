const fs        = require('fs');
const path      = require('path');
const filePath  = path.resolve(__dirname, '../database/products.json');

const Product = {
    fileName: filePath,
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, {encoding: 'utf-8'}));
    },

    findAll: function () {
        return this.getData();
    },

    getLastId: function() {
        let allProducts    = this.findAll();
        let lastUser    = allProducts.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    findById: function (id) {
        let allProducts    = this.findAll()
        let productFound   = allProducts.find(product => product.id == id)
        return productFound;
    },

    findByField: function (field, text) {
        let allProducts    = this.findAll()
        let productFound   = allProducts.find(product => product[field] === text)
        return productFound;
    },

    create: function(product) {
        let allProducts    = this.findAll();
        let newUser = {
            id: this.getLastId(),
            ...product
        }
        allProducts.push(newUser)
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ''));
        return newUser;
    },

    delete: function(id) {
        let allProducts    = this.findAll();
        let finalUsers  = allProducts.filter(product => product.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ''));
        return true;
    }
}

module.exports = Product;