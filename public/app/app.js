'use strict'
var app = angular.module('app', ["ngResource", "ngRoute", "ngTable"]);
app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        var routeRoleChecks = {
            admin: {
                auth: function(mvAuth, $q) {
                    return mvAuth.authorizeCurrentUserForRoute('admin');
                }
            },
            user: {
                auth: function(mvAuth, $q) {
                    return mvAuth.authorizeAuthenticatedUserForRoute();
                }
            },

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
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'mvProfileCtrl'
                //resolve: routeRoleChecks.user
            })
            .when('/violations', {
                templateUrl: '/partials/violations/violations',
                controller: 'dxViolCtrl'
                //resolve: routeRoleChecks.user
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'mvSignUpCtrl'
                //resolve: routeRoleChecks.admin
            });
    }
]);

