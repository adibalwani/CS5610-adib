var app = angular.module('MyApp', ['ngAutocomplete']);

app.controller("MyCntl", function ($scope, $http) {

    $scope.origin_lat = 0;
    $scope.origin_lon = 0;
    $scope.dest_lat = 0;
    $scope.dest_lon = 0;

    $scope.click = function () {

        new google.maps.Geocoder().geocode({ 'address': $scope.origin }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var origin_latitude = results[0].geometry.location.lat();
                var origin_longitude = results[0].geometry.location.lng();
                new google.maps.Geocoder().geocode({ 'address': $scope.dest }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var dest_latitude = results[0].geometry.location.lat();
                        var dest_longitude = results[0].geometry.location.lng();
                        
                        $scope.origin_lat = origin_latitude;
                        $scope.origin_lon = origin_longitude;
                        $scope.dest_lat = dest_latitude;
                        $scope.dest_lon = dest_longitude;
                        $scope.$apply();
                    }
                });
            }
        });
    };
});