'use strict'
angular.module('app')
.config(function (datepickerConfig) {
      datepickerConfig.showWeeks = false;
    })
.controller('dxViolCtrl', function($scope, $window, $location, dxViolationRes, mvIdentity, mvNotifier) {
      $scope.formData ={};
     $scope.today = function() {
        $scope.formData.dt = new Date();
      };
      $scope.today();

      $scope.showWeeks = true;
      $scope.toggleWeeks = function () {
        $scope.showWeeks = ! $scope.showWeeks;
      };

      $scope.clear = function () {
        $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
        $scope.minDate = ( $scope.minDate ) ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
      };

      $scope.dateOptions = {
        'year-format': "'yyyy'",
        'starting-day': 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      $scope.format = $scope.formats[0];

    $scope.identity = mvIdentity;
    // alert(JSON.stringify($scope.identity.currentUser));

    $scope.createNewViolation = function() {
        var newViolationData = {
            brand: $scope.brand,
            model: $scope.model,
            number: $scope.number,
            description: $scope.description,
            date: $scope.formData.dt,
            user: $scope.identity.currentUser.firstName + " " + $scope.identity.currentUser.lastName,
            userOwnerID: $scope.identity.currentUser._id
        }
        var newViolationRes = new dxViolationRes(newViolationData);
        // alert(newViolationData.date);
        newViolationRes.$save().then(function(success) {
            if (success) {
                mvNotifier.notifySuccess('Нарушение успешно добавлено');
                $location.path('/violations');
            } else {
                mvNotifier.notifyError('Сбой добавления нарушения');
            }
        });
    };
    $scope.violations = dxViolationRes.query();
});
