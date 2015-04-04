app.controller("CreateTripController", function ($scope, $http, $modalInstance, $rootScope) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Trip Module - create*/

    /*Trip is ReturnTrip at first*/
    $scope.roundTrip = true;
    $scope.driver = null;

    /*Set Round Trip to true*/
    $scope.setRoundTrip = function () {
        $scope.roundTrip = true;
    };

    /*Set Round Trip to false*/
    $scope.setOneWayTrip = function () {
        $scope.roundTrip = false;
    };

    /*Create New Trip click*/
    $scope.createTrip = function () {
        //console.log($scope.origin, $scope.destination, $scope.originTime, $scope.destinationTime);

        console.log("before");

        var body = {
            "enabled": true,
            "schedule": {
                "startMinutes": 480,
                "daysOfOperation": [false, true, true, true, true, true, false],
                "type": "REPEATING_WEEKLY"
            },
            "origin": {
                "address": "Boston, MA, United States",
                "longitude": -71.058880,
                "latitude": 42.360082
            },
            "type": "RIDE_OR_DRIVE",
            "destination": {
                "address": "New York, NY, United States",
                "longitude": -74.005941,
                "latitude": 40.712784
            }
        };

        console.log("after");

        $http.defaults.headers.post["Content-Type"] = "application/json";
        $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;

        $http.post("https://api-dev.car.ma:443/v3/users/SELF/trips", body)
        .success(function (response) {
            console.log(response);
        })
        .error(function (response) {
            console.log(response);
        })

    };

    $scope.setDriver = function () {
        $scope.driver = true;
    };
    $scope.setRider = function () {
        $scope.driver = false;
    };

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

});