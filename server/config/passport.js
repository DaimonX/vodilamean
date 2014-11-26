//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
        function(userName, password, done) {
            User.findOne({userName: userName}).exec(function(err, user) {
                if (user && user.authenticate(password)) {
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
}
