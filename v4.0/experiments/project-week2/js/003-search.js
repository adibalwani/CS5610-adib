var app = angular.module('MyApp', ['ngAutocomplete']);

app.controller("MyCntl", function ($scope, $http) {

    /*Append zero to time*/
    function appendZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    /*Miles <-> Meters*/
    function getMiles(i) {
        return i * 0.000621371192;
    }

    $scope.search = function () {
        new google.maps.Geocoder().geocode({ 'address': $scope.origin }, function (results, status) {
            /*Origin address to LatLon*/
            if (status == google.maps.GeocoderStatus.OK) {
                var origin_latitude = results[0].geometry.location.lat();
                var origin_longitude = results[0].geometry.location.lng();

                new google.maps.Geocoder().geocode({ 'address': $scope.destination }, function (results, status) {
                    /*Destination address to LatLon*/
                    if (status == google.maps.GeocoderStatus.OK) {
                        var dest_latitude = results[0].geometry.location.lat();
                        var dest_longitude = results[0].geometry.location.lng();

                        $http.defaults.headers.common.Authorization = "";

                        $http.get("https://api.car.ma:443/v2/trips/search?client_id=ext-adib-alwani&originLon=" + origin_longitude + "&originLat=" + origin_latitude + "&destinationLon=" + dest_longitude + "&destinationLat=" + dest_latitude + "&&&tripType=RIDE_OR_DRIVE&departureTimeStart=-1&departureTimeEnd=-1&onlineSince=-1&originRadius=10000.0&destinationRadius=10000.0&searchBoxPaddingDistance=10000.0&&adherence=1.0&sortBy=START_TIME_ORIGIN_DISTANCE&pageNum=1&pageSize=20&tripFields=LOCATIONS%2CLOCATION_ADDRESSES%2CDISTANCE%2CSCHEDULE%2CESTIMATED_EARNINGCOST%2CUSER_ROLE&userFields=FULL_PUBLIC")
                        .success(function (response) {
                            console.log(response);
                            for (var i in response.trips) {
                                /*Convert startMinutes to Hours and Minutes of Local Time*/
                                var hours = Math.floor(response.trips[i].schedule.startMinutes / 60);
                                var minutes = response.trips[i].schedule.startMinutes % 60;
                                if (hours > 12) {
                                    var ampm = "PM";
                                    hours = hours - 12;
                                } else {
                                    var ampm = "AM";
                                }
                                response.trips[i].schedule.hours = appendZero(hours);
                                response.trips[i].schedule.minutes = appendZero(minutes);
                                response.trips[i].schedule.ampm = ampm;

                                /*Change user role*/
                                if (response.trips[i].userRole == "RIDE") {
                                    response.trips[i].userRole = "Rider";
                                } else {
                                    response.trips[i].userRole = "Driver";
                                }

                                /*Convert metres to miles*/
                                response.trips[i].distance = Math.round(getMiles(response.trips[i].distance) * 10) / 10;
                            }
                            $scope.searchResults = response.trips;
                        });
                    }
                });
            }
        });
    };
});