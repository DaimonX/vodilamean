var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, config) {
  //set view engine
  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(stylus.middleware({
      src: config.rootPath + '/public',
      compile: compile
    }

  ));

  //all public req will be responded by public dir now.
  app.use(express.static(config.rootPath + '/public'));
}
