// Module dependencies
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
//express config
require('./server/config/express')(app, config);
//db config
require('./server/config/mongoose')(config);

//Passport
var User = mongoose.model('User');
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      userName: username
    }).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }
));

passport.serializeUser(function(user, done) {
  if (user) {
    done(null, user.id)
  }
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }).exec(function(err, user) {
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })

});



//load route
require('./server/config/routes')(app);

//start listening on server
app.listen(config.port);
console.log("Started at " + config.port);
