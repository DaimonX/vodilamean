'use strict'
angular.module('app').controller('mvProfileCtrl', function($scope, mvIdentity, mvNotifier, mvAuth){
	$scope.email = mvIdentity.currentUser.userName;
	$scope.fname = mvIdentity.currentUser.firstName;
	$scope.lname = mvIdentity.currentUser.lastName;

	$scope.update = function(){
		var newUserData = {
			userName : $scope.email,
			firstName : $scope.fname,
			lastName : $scope.lname
		}

		if ($scope.password && $scope.password.length > 0){
			newUserData.password = $scope.password;
		}
		mvAuth.upateCurrentUser(newUserData).then(function(){
			mvNotifier.notifySuccess('Профиль успешно обновлен');
		}, function(reason){
			mvNotifier.notifyError(reason);
		})
	}
});