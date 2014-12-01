var mongoose = require('mongoose');
var userModel = require('../models/User');
var violation = require('../models/Violation');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('vodilamean db opened on ' + config.db);
    });

    userModel.createDefaultUsers();
    violation.createDefaultViolations();
};