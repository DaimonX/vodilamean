var mongoose = require('mongoose');
var crypto = require('crypto');

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
  	userName :String,
    salt: String,
    hash_pwd: String
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return (hashPwd(this.salt, passwordToMatch) === this.hash_pwd);
    }
  }

  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function(err, collection){
  	if(collection.length === 0) {
      var salt, hash;
      salt =  createSalt();
      hash = hashPwd(salt,'111');
  		User.create({firstName:'Dima', lastName:'Dimonovich', userName:'Dx', salt: salt, hash_pwd:hash});
      salt =  createSalt();
      hash = hashPwd(salt,'222');
      User.create({firstName:'Andriy', lastName:'Andriyovich', userName:'Andriy', salt: salt, hash_pwd:hash})
  	}
  })
}

function createSalt(){
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}