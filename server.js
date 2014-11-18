// Module dependencies
var express = require('express');
//var mongoose = require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
//express config
require('./server/config/express')(app, config);
//db config
require('./server/config/mongoose')(config);
//load route
require('./server/config/routes')(app);

//start listening on server
app.listen(config.port);
console.log("Started at "+config.port);
