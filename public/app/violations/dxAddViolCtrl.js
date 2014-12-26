'use strict'
angular.module('app').controller('dxAddViolCtrl', function($scope, $state, $location, $window, dxViolationRes, mvIdentity, mvNotifier) {
    $scope.createNewViolation = function() {
        $scope.identity = mvIdentity;
        var user = !!$scope.identity.currentUser ? ($scope.identity.currentUser.firstName + " " + $scope.identity.currentUser.lastName) : 'нет';
        var newViolationData = {
                brand: $scope.brand,
                model: $scope.model,
                number: $scope.number,
                description: $scope.description,
                date: $scope.formData.dt,
                user: user
            }
            // adding user if logedin
        if (!!$scope.identity.currentUser) {
            newViolationData.userOwnerID = $scope.identity.currentUser._id
        } else {
            delete newViolationData.userOwnerID;
        }
        // adding loc if marker moved
        if (!!$scope.lat & !!$scope.lon) {
            var arr = [$scope.lon, $scope.lat];
            newViolationData['loc'] = {};
            newViolationData['loc']['coordinates'] = arr;
        };
        var newViolationRes = new dxViolationRes(newViolationData);
        // alert(newViolationData.date);
        newViolationRes.$save().then(function(success) {
            if (success) {
                mvNotifier.notifySuccess('Нарушение успешно добавлено');
                $state.go('violations', null, { reload: true, inherit: false, notify: true });
                
            } else {
                mvNotifier.notifyError('Сбой добавления нарушения');
            }
        });
        
    };
});
