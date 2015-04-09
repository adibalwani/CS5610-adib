app.controller("CreateTripController", function ($scope, $http, $modalInstance, $location, $cookieStore) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Trip Module - create*/

    /*Default role is Drive*/
    $scope.role = 'DRIVE';

    /*Days of Operation*/
    $scope.daysOfOperation = [false, true, true, true, true, true, false]

    /*Set Default date in origin and destination*/
    var d = new Date();
    d.setHours(8);
    d.setMinutes(0);
    $scope.originTime = d;
    $scope.destinationTime = d;

    /*Set User Role*/
    $scope.setDriver = function () {
        $scope.role = 'DRIVE';
        $('#riderButton').toggleClass('highlight supress');
        $('#driverButton').toggleClass('supress highlight');
    };
    $scope.setRider = function () {
        $scope.role = 'RIDE';
        $('#driverButton').toggleClass('highlight supress');
        $('#riderButton').toggleClass('supress highlight');
    };

    /*Set Days of operation*/
    $scope.setSunday = function () {
        if ($scope.daysOfOperation[0] == false) {
            $scope.daysOfOperation[0] = true;
            $('#sundayButton').toggleClass('supress highlight');
        } else {
            $scope.daysOfOperation[0] = false;
            $('#sundayButton').toggleClass('highlight supress');
        }
    };
    $scope.setMonday = function () {
        if ($scope.daysOfOperation[1] == false) {
            $scope.daysOfOperation[1] = true;
            $('#mondayButton').toggleClass('supress highlight');
        } else {
            $scope.daysOfOperation[1] = false;
            $('#mondayButton').toggleClass('highlight supress');
        }
    };
    $scope.setTuesday = function () {
        if ($scope.daysOfOperation[2] == false) {
            $scope.daysOfOperation[2] = true;
            $('#tuesdayButton').toggleClass('supress highlight');
        } else {
            $scope.daysOfOperation[2] = false;
            $('#tuesdayButton').toggleClass('highlight supress');
        }
    };
    $scope.setWednesday = function () {
        if ($scope.daysOfOperation[3] == false) {
            $scope.daysOfOperation[3] = true;
            $('#wednesdayButton').toggleClass('supress highlight');
        } else {
            $scope.daysOfOperation[3] = false;
            $('#wednesdayButton').toggleClass('highlight supress');
        }
    };
    $scope.setThursday = function () {
        if ($scope.daysOfOperation[4] == false) {
            $scope.daysOfOperation[4] = true;
            $('#thursdayButton').toggleClass('supress highlight');
        } else {
            $scope.daysOfOperation[4] = false;
            $('#thursdayButton').toggleClass('highlight supress');
        }
    };
    $scope.setFriday = function () {
        if ($scope.daysOfOperation[5] == false) {
            $scope.daysOfOperation[5] = true;
            $('#fridayButton').toggleClass('supress highlight');
        } else {
            $scope.daysOfOperation[5] = false;
            $('#fridayButton').toggleClass('highlight supress');
        }
    };
    $scope.setSaturday = function () {
        if ($scope.daysOfOperation[6] == false) {
            $scope.daysOfOperation[6] = true;
            $('#saturdayButton').toggleClass('supress highlight');
        } else {
            $scope.daysOfOperation[6] = false;
            $('#saturdayButton').toggleClass('highlight supress');
        }
    };

    /*Create New Trip click*/
    $scope.createTrip = function () {
        
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
                        var originTime = new Date($scope.originTime);
                        var midnight = new Date(originTime.getFullYear(), originTime.getMonth(), originTime.getDate(), 0, 0, 0);
                        var timeDiff = Math.abs(originTime.getTime() - midnight.getTime());
                        var diffMinutes = Math.floor(timeDiff / (1000 * 60));

                        var body = {
                            "enabled": true,
                            "schedule": {
                                "startMinutes": diffMinutes,
                                "daysOfOperation": $scope.daysOfOperation,
                                "type": "REPEATING_WEEKLY"
                            },
                            "alias": $scope.title,
                            "origin": {
                                "address": $scope.origin,
                                "longitude": origin_longitude,
                                "latitude": origin_latitude
                            },
                            "type": $scope.role,
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