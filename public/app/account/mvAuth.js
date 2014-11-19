'use strict'
angular.module('app').factory('mvAuth', function($http, mvIdentity, $q) {
    return {
        authenticateUser: function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {
                    username: username,
                    password: password
                })
                .then(function(response) {
                    if (response.data.success) {
                        mvIdentity.currentUser = response.data.user;
                        dfd.resolve(true);
                        //mvNotifier.notify('You have successfully signed in !');
                    } else {
                        dfd.resolve(false);
                        //mvNotifier.notify('Incorrect');
                    }
            });
        	return dfd.promise;

        }
    }					
})

