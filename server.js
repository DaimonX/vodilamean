// Module dependencies
var express 	= require('express');
var	stylus 		= require('stylus');
var logger 		= require('morgan');
var bodyParser	= require('body-parser');
var mongoose 	= require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

//set view engine
function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade'); 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}

));

//all public req will be responded by public dir now.
app.use(express.static(__dirname + '/public'));


// MongoDB configuration
if(env ==='development'){
	mongoose.connect('mongodb://localhost:27017/vodilamean', function(err, res) {
 		if(err) {
  			console.log('error connecting to MongoDB Database. ' + err);
		} else {
    		console.log('Connected to Loacal Database');
 }
});
} else {
	mongoose.connect('mongodb://vodila:vodilamean@ds033380.mongolab.com:33380/vodilamean', function(err, res) {
  		if(err) {
    		console.log('error connecting to MongoLab Database. ' + err);
  		} else {
    		console.log('Connected to MongoLab Database');
  }
});
}

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function callback(){
	console.log('vodilamean db opened');
});

/*var messageSchema = mongoose.Schema({message:String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
	mongoMessage = messageDoc.message;
});*/

//load route
app.get('/partials/:partialPath', function(req,res){
	res.render('partials/'+req.params.partialPath);
})

app.get('*', function(req,res){
	res.render('index');
});

//start listening on server
var port = process.env.PORT || 3030;
app.listen(port);
console.log("Started at 3030");