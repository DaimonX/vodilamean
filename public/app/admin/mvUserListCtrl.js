'use strict'
angular.module('app').controller('mvUserListCtrl', function($scope, mvUser) {
	$scope.users = mvUser.query();
	$scope.titles = "mvUserListCtrl";
});