'use strict'
var app = angular.module('app', ["ngResource", "ngRoute"]);
app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        var routeRoleChecks = {
            admin: {
                auth: function(mvAuth, $q) {
                    return mvAuth.authorizeCurrentUserForRoute('admin');
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'mvMainCtrl'
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/user-list',
                controller: 'mvUserListCtrl'
                //resolve: routeRoleChecks.admin
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'mvSignUpCtrl'
                //resolve: routeRoleChecks.admin
            });
    }
]);

