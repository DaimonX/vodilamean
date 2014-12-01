var auth = require('./auth');
var users = require('../controllers/users');
var violation = require('../models/Violation');
//var Violation = require('mongoose').model('Violation');

var mongoose = require('mongoose');

module.exports = function(app) {

  app.get('/api/users', auth.requiresRole('admin') , users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);
  
  app.get('/api/violations', violation.list);
  app.post('/api/violations', violation.createNewViolation);

  app.get('/partials/*', function(req, res) {
    console.log('+ + + + + + + + + + + + + + +  /partials/* + + + + + + + + + + + + + '+req.params[0]);
    res.render('../../public/app/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.get('*', function(req, res) {
    console.log(' + + + + + + + + + + + + + + +  DEFAULT ROUTE NODEJS + + + + + + + + + + +');
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
}
