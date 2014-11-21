'use strict'
angular.module('app').controller('mvSignUpCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth){

	$scope.signup = function(){
		var newUserData = {
			userName: $scope.email,
			password: $scope.password,
			firstName: $scope.fname,
			lastName: $scope.lname
		};

		mvAuth.createUser(newUserData).then(function(){
			mvNotifier.notifySuccess('Пользователь успешно создан');
			$location.path('/');
		}, function(reason) {
			mvNotifier.notifyError(reason);
		});
	}
});