'use strict'

angular.module('app').service('States', function() {
  this.configure = function (app) {
    app.stateProvider
      .state('main', {
        url: "/",
        templateUrl: "/partials/main/main",
        controller: 'mvMainCtrl'
      })
      .state('users', {
        url: "/admin/users",
        templateUrl: "/partials/admin/user-list",
        controller: 'mvUserListCtrl'
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "/partials/account/profile",
        controller: 'mvProfileCtrl'
      })
      .state('violations', {
          url: "/violations",
          views: {
            'content':{
                templateUrl: "/partials/violations/violations",
                controller: 'dxViolCtrl'
            }
          }
        })
        .state('violations.add', {
          url: '/add',
          views: {
            'violations': {
              templateUrl: '/partials/violations/addviolation',
              controller: 'dxAddViolCtrl'
            }
        }
        })
        .state('violations.show', {
          url: '/show/:id',
          views: {
            'violations': {
              templateUrl: '/partials/violations/show-violation',
              controller: 'dxShowViolCtrl'
            }
        }
        })
      .state('signup', {
        url: "/signup",
        templateUrl: "/partials/account/signup",
        controller: 'mvSignUpCtrl'
      });
}
});