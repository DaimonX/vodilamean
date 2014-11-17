'use strict'
angular.module('app').controller('mvNavBarLoginCtrl', function ($scope) {
	$scope.signIn = function(username, password){
		console.log(username+" "+password);
	}
})