var app = angular.module('MyApp', ['ui.bootstrap']);

app.controller("MyCntl", function ($scope, $http) {
    
    /*Login click*/
    $scope.login = function () {

        var body = {
            "client_id": "ext-adib-alwani",
            "client_secret": "2EF3313BABACC399ED2618E437CF2",
            "username": $scope.email,
            "password": $scope.password,
            "grant_type": "password",
            "scope": "rtr"
        };

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $http.post("https://api-dev.car.ma:443/security/oauth/token/pw", $.param(body))
        .success(function (response) {
            $scope.access_token = response.access_token;

            /*Miles <-> Meters*/
            function getMiles(i) {
                return i * 0.000621371192;
            }

            function getMeters(i) {
                return i * 1609.344;
            }

            /*Display existing Trips*/
            $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;

            $http.get("https://api-dev.car.ma:443/v2/users/SELF/trips?client_id=ext-adib-alwani&&tripFields=LOCATION_ADDRESSES%2CUSER_ROLE%2CDISTANCE%2CSCHEDULE")
            .success(function (response) {
                console.log(response);
                for (var i in response.trips) {
                    /*Change user role*/
                    if (response.trips[i].userRole == "RIDE") {
                        response.trips[i].userRole = "Rider";
                    } else if (response.trips[i].userRole == "DRIVE") {
                        response.trips[i].userRole = "Driver";
                    } else {
                        response.trips[i].userRole = "Rider/Driver";
                    }

                    /*Convert metres to miles*/
                    response.trips[i].distance = Math.round(getMiles(response.trips[i].distance) * 10) / 10;
                }
                $scope.tripResults = response.trips;
            })
            .error(function (response) {
                console.log(response);
            });

        })
        .error(function (response) {
            alert("Error: Check console");
            console.log(response);
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

});