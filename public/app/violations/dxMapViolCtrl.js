'use strict'
angular.module('app').controller('dxMapViolCtrl', function($scope, $state, dxViolationRes, $window, $stateParams) {
    $scope.listMarkers = [];
    $scope.show = dxViolationRes.query().$promise.then(function(data){
        $scope.listMarkers = data.map(toCoords);
        $scope.listMarkers=$scope.listMarkers.filter(Boolean);
        $scope.isGetCoords = true;
    });


    function toCoords(value, index, array){
        var marker= {};
                if(value.loc.coordinates.length !== 0){
                var latitude = value.loc.coordinates[1];
                var longitude = value.loc.coordinates[0];

                new google.maps.LatLng(latitude, longitude);

                marker = {
                    id: value._id,
                    coordinates:{
                        latitude :latitude,
                        longitude :longitude
                    },
                    icon:"//google-maps-icons.googlecode.com/files/car.png",
                    onClick:function(){
                        $state.go('violations.show', {'id':value._id}, { reload: true, inherit: false, notify: true });
                    },
                    options:{
                        title:value.number
                    }
                };
                return marker;
        }
        return null;
        };
})