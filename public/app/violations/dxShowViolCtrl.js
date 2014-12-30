'use strict'
angular.module('app').controller('dxShowViolCtrl', function($scope, dxViolationRes, $window, $stateParams) {
    $scope.dxAddVar = "dxShowViolCtrl";
    $scope.show = {};
    dxViolationRes.get({
        id: $stateParams.id
    }).$promise.then(
        function(data) {
            $scope.show = data;
            //initialize map if is coordinates
            if(data.loc.coordinates.length !== 0){
                $scope.latitude = data.loc.coordinates[1];
                $scope.longitude = data.loc.coordinates[0];
                
                $scope.map = {
                    center: {
                        latitude: $scope.latitude,
                        longitude: $scope.longitude
                    },
                    zoom: 13,
                };

                $scope.marker = {
                    id: 0,
                    coords: {
                        latitude: $scope.latitude,
                        longitude: $scope.longitude
                    },
                    options: {
                        draggable: false,
                        title: data.number,
                        icon:"//google-maps-icons.googlecode.com/files/car.png"
                    }
                };
                $scope.isGetCoords = true;
        }
        });



});
