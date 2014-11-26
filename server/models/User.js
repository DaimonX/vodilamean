var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: '{PATH} is required!'
    },
    lastName: {
        type: String,
        required: '{PATH} is required!'
    },
    userName: {
        type: String,
        required: '{PATH} is required!',
        unique: true,
        index: true
    },
    salt: {
        type: String,
        required: '{PATH} is required!'
    },
    hash_pwd: {
        type: String,
        required: '{PATH} is required!'
    },
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return (encrypt.hashPwd(this.salt, passwordToMatch) === this.hash_pwd);
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, '111');
            User.create({
                firstName: 'Dima',
                lastName: 'Dimonovich',
                userName: 'Dx',
                salt: salt,
                hash_pwd: hash,
                roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, '222');
            User.create({
                firstName: 'Andriy',
                lastName: 'Andriyovich',
                userName: 'Andriy',
                salt: salt,
                hash_pwd: hash,
                roles: []
            })
        }
    })
};

exports.createDefaultUsers = createDefaultUsers;
