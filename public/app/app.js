'use strict'
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $routeProvider
  .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});

});

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.myVar = " То чувстов когда заебашил хеловворлд";
});