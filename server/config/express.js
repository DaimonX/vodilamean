var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

module.exports = function(app, config) {
  //set view engine
  function compile(str, path) {
    return stylus(str).set('filename', path);
  }
  //view engines config
  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  
  app.use(logger('dev'));
  app.use(bodyParser.json()); //req.body....
  app.use(cookieParser());
  app.use(session({secret:'vodilamean',
                   saveUninitialized: true,
                   resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());



  app.use(stylus.middleware({
      src: config.rootPath + '/public',
      compile: compile
    }

  ));

  //all public req will be responded by public dir now.
  app.use(express.static(config.rootPath + '/public'));
}
