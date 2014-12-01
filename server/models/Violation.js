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


exports.createNewViolation = function(req, res) {
   console.console.log('createNewViolation');
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
