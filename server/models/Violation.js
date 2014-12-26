var mongoose = require('mongoose');

var violationSchema = mongoose.Schema({
    brand: {
        type: String
    },
    model: {
        type: String
    },
    number: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    user: {
        type: String
    },
    loc:{
        type: {
            type: String,
            default:'Point'
        },
        coordinates : {
            type:[Number]
        },
        index: {
            type: String,
            default:'2d'
        }
        },
    userOwnerID: {
    	type: mongoose.Schema.Types.ObjectId
    }
});

var Violation = mongoose.model('Violation', violationSchema);

exports.list = function(req, res) {
    Violation.find({}).exec(function(err, collection) {
        res.send(collection);
    })

};

exports.violation = function(req, res) {
    Violation.findOne({_id:req.params.id}).exec(function(err, violation) {
        res.send(violation);
    })

};


exports.createNewViolation = function(req, res) {
   var violation = new Violation(req.body)
   console.log('Violation aded ' + JSON.stringify(violation));
   violation.save(function(err, data){
   	if (err) {
      return res.send(err);
    }
    res.send({ message: 'Violation aded '+ JSON.stringify(violation)});
   })
   
};


exports.createDefaultViolations = function() {
    Violation.find({}).exec(function(err, collection) {
        if (collection.length === 0) {

            Violation.create({
                brand: 'Volvo',
                model: 'CX70',
                number: 'ВХ 1111 АЕ',
                description: 'Обгон через две сплошных',
                date: new Date('08/05/2014')
            });
        };
    });
};
