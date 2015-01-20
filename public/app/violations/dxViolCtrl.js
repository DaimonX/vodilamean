'use strict'
angular.module('app')
    .config(function(datepickerConfig) {
        datepickerConfig.showWeeks = false;
    })
    .controller('dxViolCtrl', function($scope, $window, $location, dxViolationRes, mvIdentity, mvNotifier) {
        $scope.formData = {};
        $scope.dxViolCtrl = 'dxViolCtrl';
        $scope.lat = "";
        $scope.lon = "";

        $scope.marker = {};
        
        $scope.writeToConsole = function(){
          if (!!$scope.lat & !!$scope.lon) {alert($scope.lat +" "+$scope.lat)};
          if (!!$scope.lat & !!$scope.lon) {
              var arr = [$scope.lon, $scope.lat];
              var newViolationData = {};
              newViolationData['loc'] ={};
              newViolationData['loc']['loc2']=arr;
              alert(JSON.stringify(newViolationData));
            };
        };

        $scope.search = function(searchText){
            var hash = $location.search('search',searchText).path('/violations').absUrl();
            $scope.violations = dxViolationRes.query({search:searchText});
            // $location.url(hash);
        };

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 13,
        };

        $scope.marker = {
            id: 0,
            events: {
              dragend: function (marker, eventName, args) {
                $scope.lat = marker.getPosition().lat();
                $scope.lon = marker.getPosition().lng();
              }
            },
            options: {
                draggable: true
            }
        };
        
        function onSuccess(position) {
            $scope.map.center = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            $scope.marker.coords = {
              latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            
            $scope.$apply();
        }
        function onError(error) {
            console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);




        $scope.today = function() {
            $scope.formData.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function() {
            $scope.showWeeks = !$scope.showWeeks;
        };

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function() {
            $scope.minDate = ($scope.minDate) ? null : new Date();
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

        // alert(JSON.stringify($scope.identity.currentUser));
        $scope.goViolation = function(violation){
          alert('goViolation');
          var hash = '/violations/' + violation._id;
          $location.url(hash);
        };
        
        
        $scope.violations = dxViolationRes.query();
    });
