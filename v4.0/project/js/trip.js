app.controller("TripController", function ($scope, $http, $modal, $cookieStore) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Trip Module*/

    /*Create New Trip click*/
    $scope.createTrip = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/createTrip.html',
            controller: 'CreateTripController'
        });

        modalInstance.result.then(function () {

            /*Display existing Trips*/
            $http.defaults.headers.common.Authorization = "Bearer " + $cookieStore.get('access_token');

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

        });
    };

    /*Miles <-> Meters*/
    function getMiles(i) {
        return i * 0.000621371192;
    }

    function getMeters(i) {
        return i * 1609.344;
    }

    /*Display existing Trips*/
    $http.defaults.headers.common.Authorization = "Bearer " + $cookieStore.get('access_token');

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

    /////////////////////////////////////////////////////////////////////////////////////////////////

});