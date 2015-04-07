app.controller("CreateTripController", function ($scope, $http, $modalInstance, $location, $cookieStore) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Trip Module - create*/

    /*Trip is ReturnTrip at first*/
    $scope.roundTrip = true;
    $scope.driver = 'RIDE_OR_DRIVE';

    /*Days of Operation*/
    $scope.daysOfOperation = [false, false, false, false, false, false, false]

    /*Set Default date in origin and destination*/
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    $scope.originTime = d;
    $scope.destinationTime = d;

    $scope.setDriver = function () {
        $scope.driver = 'DRIVE';
    };
    $scope.setRider = function () {
        $scope.driver = 'RIDE';
    };

    /*Set Round Trip to true*/
    $scope.setRoundTrip = function () {
        $scope.roundTrip = true;
    };

    /*Set Round Trip to false*/
    $scope.setOneWayTrip = function () {
        $scope.roundTrip = false;
    };

    /*Set Days of operation*/
    $scope.setSunday = function () {
        if ($scope.daysOfOperation[0] == false) {
            $scope.daysOfOperation[0] = true;
        } else {
            $scope.daysOfOperation[0] = false;
        }
    };
    $scope.setMonday = function () {
        if ($scope.daysOfOperation[1] == false) {
            $scope.daysOfOperation[1] = true;
        } else {
            $scope.daysOfOperation[1] = false;
        }
    };
    $scope.setTuesday = function () {
        if ($scope.daysOfOperation[2] == false) {
            $scope.daysOfOperation[2] = true;
        } else {
            $scope.daysOfOperation[2] = false;
        }
    };
    $scope.setWednesday = function () {
        if ($scope.daysOfOperation[3] == false) {
            $scope.daysOfOperation[3] = true;
        } else {
            $scope.daysOfOperation[3] = false;
        }
    };
    $scope.setThursday = function () {
        if ($scope.daysOfOperation[4] == false) {
            $scope.daysOfOperation[4] = true;
        } else {
            $scope.daysOfOperation[4] = false;
        }
    };
    $scope.setFriday = function () {
        if ($scope.daysOfOperation[5] == false) {
            $scope.daysOfOperation[5] = true;
        } else {
            $scope.daysOfOperation[5] = false;
        }
    };
    $scope.setSaturday = function () {
        if ($scope.daysOfOperation[6] == false) {
            $scope.daysOfOperation[6] = true;
        } else {
            $scope.daysOfOperation[6] = false;
        }
    };

    /*Create New Trip click*/
    $scope.createTrip = function () {
        //console.log($scope.origin, $scope.destination, $scope.originTime, $scope.destinationTime);



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

                        var body = {
                            "enabled": true,
                            "schedule": {
                                "startMinutes": moment(new Date($scope.originTime).getTime()).unix(),
                                "daysOfOperation": $scope.daysOfOperation,
                                "type": "REPEATING_WEEKLY"
                            },
                            "alias": $scope.title,
                            "origin": {
                                "address": $scope.origin,
                                "longitude": origin_longitude,
                                "latitude": origin_latitude
                            },
                            "type": $scope.driver,
                            "destination": {
                                "address": $scope.destination,
                                "longitude": dest_longitude,
                                "latitude": dest_latitude
                            }
                        };
                        console.log(body);
                        $http.defaults.headers.post["Content-Type"] = "application/json";
                        $http.defaults.headers.common.Authorization = "Bearer " + $cookieStore.get('access_token');

                        $http.post("https://api-dev.car.ma:443/v3/users/SELF/trips", body)
                        .success(function (response) {
                            console.log(response);
                            $modalInstance.close();
                        })
                        .error(function (response) {
                            console.log(response);
                        })
                    }
                });
            }
        });
    };

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /*Fetch current location using Maps API*/
    $scope.locate = function () {
        if (navigator.geolocation) {    //browser supports maps
            navigator.geolocation.getCurrentPosition(
            displayCurrentLocation,
            displayError,
            {
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true
            });
        } else {
            alert("oops, no geolocation support");
        }
    };

    /*Display current location*/
    function displayCurrentLocation(position) {
        var geocoder = new google.maps.Geocoder();
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        geocoder.geocode({ 'latLng': latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $scope.origin = results[0].formatted_address;
                    $scope.$apply();
                }
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    /*Error on failure of Maps API*/
    function displayError(error) {
        var errorType = {
            0: "Unknown error",
            1: "Permission denied by user",
            2: "Position is not available",
            3: "Request time out"
        };
        var errorMessage = errorType[error.code];
        if (error.code == 0 || error.code == 2) {
            errorMessage = errorMessage + "  " + error.message;
        }
        alert("Error Message " + errorMessage);
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

});