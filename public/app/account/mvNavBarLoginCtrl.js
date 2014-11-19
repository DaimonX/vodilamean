'use strict'
angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth) {
  $scope.identity = mvIdentity;
  $scope.signIn = function(username, password) {
    console.log(username + " " + password);
    mvAuth.authenticateUser(username, password).then(function(success){
    	if(success) {
    		mvNotifier.notifySuccess(username+',  Вы успешно авторизовались');
    	}else{
    		mvNotifier.notifyError('Неверный логин или пароль');
    	}
    });
  }
});
