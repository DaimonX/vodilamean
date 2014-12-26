'use strict'
var app = angular.module('app', [
    "ui.router",
    "ngResource",
    "ngRoute",
    "ngTable",
    "ui.bootstrap",
    "uiGmapgoogle-maps"
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  app.stateProvider = $stateProvider;
});

app.run(function (States) {
  States.configure(app);
});

