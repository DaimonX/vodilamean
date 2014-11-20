var auth = require('./auth');

var mongoose = require('mongoose');
User = mongoose.model('User');

module.exports = function(app) {

  app.get('/api/users', auth.requiresRole('admin') ,function(req, res){
    User.find({}).exec(function(err, collection){
      res.send(collection);
    })
  });

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
    console.log('/partials/*  '+req.params[0]);
    console.log(req.params[1]);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.get('*', function(req, res) {
    console.log('INDEX FROM SERVER.JS++++++++++++++++++++++++++++++++++++++++++++++');
    res.render('index', {
      bootstrappedUser: req.user
    });
    console.log('INDEX FROM SERVER.JS++++++++++++++++++++++++++++++++++++++++++++++');
  });
}
