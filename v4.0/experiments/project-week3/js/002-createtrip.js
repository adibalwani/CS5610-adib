var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http) {
    
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
                "address": "Northeastern University",
                "longitude": -71.089172,
                "latitude": 42.339807
            },
            "type": "RIDE_OR_DRIVE",
            "destination": {
                "address": "New York, NY, United States",
                "longitude": 40.712784,
                "latitude": -74.005941
            }
        };

        console.log("after");

        $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;

        $http.post("https://api-dev.car.ma:443/v3/users/SELF/trips", body)
        .success(function (response) {
            console.log(response);
        })
        .error(function (response) {
            console.log(response);
        })

    };
});