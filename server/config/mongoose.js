var mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('vodilamean db opened on '+config.db);
  });

  var userSchema = mongoose.Schema({
  	firstName: String,
  	listName: String,
  	userName :String
  });
  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function(err, collection){
  	if(collection.length === 0) {
  		User.create({firstName:'Dima', lastName:'Dimonovich', userName:'Dx'});
      User.create({firstName:'Andriy', lastName:'Andriyovich', userName:'Andriy'})
  	}
  })
}
