const fs        = require('fs');
const path      = require('path');
const filePath  = path.resolve(__dirname, '../database/users.json');

const User = {
    fileName: filePath,
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, {encoding: 'utf-8'}));
    },

    findAll: function () {
        return this.getData();
    },

    getLastId: function() {
        let allUsers    = this.findAll();
        let lastUser    = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    findById: function (id) {
        let allUsers    = this.findAll()
        let userFound   = allUsers.find(user => user.id === id)
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers    = this.findAll()
        let userFound   = allUsers.find(user => user[field] === text)
        return userFound;
    },

    create: function(user) {
        let allUsers    = this.findAll();
        let newUser = {
            id: this.getLastId(),
            ...user
        }
        allUsers.push(newUser)
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ''));
        return newUser;
    },

    delete: function(id) {
        let allUsers    = this.findAll();
        let finalUsers  = allUsers.filter(user => user.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ''));
        return true;
    }
}

module.exports = User;