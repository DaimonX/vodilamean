'use strict'
angular.module('app').controller('dxViolCtrl', function($scope, $window, $location, dxViolationRes, mvNotifier) {
    $scope.createNewViolation = function() {
        var newViolationData = {
            brand: $scope.brand,
            model: $scope.model,
            number: $scope.number,
            description: $scope.description,
            date: $scope.date,
            userOwnerID: $scope.userOwnerID
        }
        var newViolationRes = new dxViolationRes(newViolationData);

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
