app.controller("SearchController", function ($scope, $http, $location, $rootScope) {
    
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Search Module*/

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

    function getMeters(i) {
        return i * 1609.344;
    }

    /*Search for user*/
    new google.maps.Geocoder().geocode({ 'address': $location.search().origin }, function (results, status) {
        /*Origin address to LatLon*/
        if (status == google.maps.GeocoderStatus.OK) {
            var origin_latitude = results[0].geometry.location.lat();
            var origin_longitude = results[0].geometry.location.lng();

            new google.maps.Geocoder().geocode({ 'address': $location.search().destination }, function (results, status) {
                /*Destination address to LatLon*/
                if (status == google.maps.GeocoderStatus.OK) {
                    var dest_latitude = results[0].geometry.location.lat();
                    var dest_longitude = results[0].geometry.location.lng();

                    $http.defaults.headers.common.Authorization = "";

                    $http.get("https://api.car.ma:443/v2/trips/search?client_id=ext-adib-alwani&originLon=" + origin_longitude + "&originLat=" + origin_latitude + "&destinationLon=" + dest_longitude + "&destinationLat=" + dest_latitude + "&&&tripType=RIDE_OR_DRIVE&departureTimeStart=" + moment(new Date($location.search().date).getTime()).unix() + "&departureTimeEnd=-1&onlineSince=-1&originRadius=10000.0&destinationRadius=10000.0&searchBoxPaddingDistance=10000.0&&adherence=1.0&sortBy=START_TIME_ORIGIN_DISTANCE&pageNum=1&pageSize=20&tripFields=LOCATIONS%2CLOCATION_ADDRESSES%2CDISTANCE%2CSCHEDULE%2CESTIMATED_EARNINGCOST%2CUSER_ROLE&userFields=FULL_PUBLIC")
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

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Favorites Module*/

    /*Get Favorites*/
    $scope.getFavorite = function () {
        $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;

        $http.get("https://api-dev.car.ma/v1/users/SELF/favouriteUsers?userFields=ALIAS&pageSize=20&pageNum=1")
        .success(function (response) {
            console.log(response);
        });
    }

    /*Add to favorite click*/
    $scope.addFavorite = function (index) {
        $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;

        //console.log($scope.searchResults[index].ownerUid);
        //$http.post("https://api-dev.car.ma/v1/users/SELF/favouriteUsers/" + $scope.searchResults[index].ownerUid + "/add")
        $http.post("https://api-dev.car.ma/v1/users/SELF/favouriteUsers/1485767212/add")
        .success(function (response) {
            console.log(response);
        })
    };

    /*Remove from favorite click*/
    $scope.removeFavorite = function (index) {
        $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;
        console.log("remove");
        //console.log($scope.searchResults[index].ownerUid);
        $http.post("https://api-dev.car.ma/v1/users/SELF/favouriteUsers/" + $scope.searchResults[index].ownerUid + "/remove")
        .success(function (response) {
            console.log("removed");
            console.log(response);
        })
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Profile Module*/

    /*View detailed profile*/
    $scope.viewProfile = function (index) {

    };

});