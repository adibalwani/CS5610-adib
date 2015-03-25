var app = angular.module('MyApp', ['ngAutocomplete']);

app.controller("MyCntl", function ($scope, $http) {

    $scope.click = function () {

        var origin_geocoder = new google.maps.Geocoder();
        var dest_geocoder = new google.maps.Geocoder();
        var origin = $scope.origin;
        var dest = $scope.dest;

        origin_geocoder.geocode({ 'address': origin }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var origin_latitude = results[0].geometry.location.lat();
                var origin_longitude = results[0].geometry.location.lng();
                dest_geocoder.geocode({ 'address': dest }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var dest_latitude = results[0].geometry.location.lat();
                        var dest_longitude = results[0].geometry.location.lng();

                        $http.get("https://api.car.ma/carmaapi/v2/trips/search?client_id=ext-adib-alwani&originLon=" + origin_longitude + "&originLat=" + origin_latitude + "&destinationLon=" + dest_longitude + "&destinationLat=" + dest_latitude + "&tripType=RIDE_OR_DRIVE&departureTimeStart=-1&departureTimeEnd=-1&onlineSince=-1&originRadius=10000.0&destinationRadius=10000.0&searchBoxPaddingDistance=10000.0&adherence=1.0&sortBy=START_TIME_ORIGIN_DISTANCE&tripFields=DISTANCE,SCHEDULE")
                        .success(function (response) {
                            console.log(response);
                        });
                    }
                });
            }
        });

    };
});