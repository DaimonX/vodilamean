'use strict'
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $routeProvider
  .when('/', { templateUrl: '/partials/main', controller: 'mvMainCtrl'});

});