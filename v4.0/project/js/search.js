﻿app.controller("SearchController", function ($scope, $http, $location, $modal, $cookieStore, $window) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Search-Bar Module*/

    $scope.origin = $location.search().origin;
    $scope.destination = $location.search().destination;
    $scope.date = moment($location.search().date).format("YYYY-MM-DD");

    /*Search click - set parameters and redirect*/
    $scope.search = function () {
        $location.search('origin', $scope.origin);
        $location.search('destination', $scope.destination);
        $location.search('date', $scope.date);
        $location.path('/search');
    };

    /*Date Picker*/
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.minDate = $scope.minDate ? null : new Date();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.format = 'dd-MMMM-yyyy';

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

                    $http.defaults.headers.post["Content-Type"] = "application/json";
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

                            /*Favorite Logic*/
                            if ($cookieStore.get('access_token')) {
                                /*Logged in*/
                                $scope.isLoggedIn = true;
                                checkFavorite(i);
                            } else {
                                $scope.isLoggedIn = false;
                            }

                            function checkFavorite(index) {
                                /*Check if already favorited*/
                                $http.get("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/favorite/" + response.trips[index].ownerUid)
                                .success(function (res) {
                                    $scope.searchResults = response.trips;
                                    /*Is favorite*/
                                    response.trips[index].isFavorite = true;
                                })
                                .error(function (res, status) {
                                    if (status == 404) {
                                        /*Is not favorite*/
                                        response.trips[index].isFavorite = false;
                                    } else {
                                        console.log(res);
                                    }
                                });
                            };

                        }
                        $scope.searchResults = response.trips;
                    });
                }
            });
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Favorites Module*/

    /*Login*/
    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });

        modalInstance.result.then(function () {
            $scope.isLoggedIn = true;
            $window.location.reload();
        });
    };

    /*Get Favorites*/
    $scope.getFavorite = function () {
        $http.get("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/favorite")
        .success(function (response) {
            console.log(response);
        })
        .error(function (response) {
            console.log(response);
        });
    }

    /*Add to favorite click*/
    $scope.addFavorite = function (index) {
        $http.post("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/favorite/" + $scope.searchResults[index].ownerUid + "/add")
        .success(function (response) {
            $scope.searchResults[index].isFavorite = true;
        })
        .error(function (response) {
            console.log(response);
        });
    };

    /*Remove from favorite click*/
    $scope.removeFavorite = function (index) {
        $http.post("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/favorite/" + $scope.searchResults[index].ownerUid + "/remove")
        .success(function (response) {
            $scope.searchResults[index].isFavorite = false;
        })
        .error(function (response) {
            console.log(response);
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Review Module*/

    /*Get Review*/
    $scope.getReview = function () {
        $http.get("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/review")
        .success(function (response) {
            console.log(response);
        })
        .error(function (response) {
            console.log(response);
        });
    }

    /*Add review click*/
    $scope.viewReview = function (index) {
        $modal.open({
            templateUrl: 'partials/review.html',
            controller: 'ReviewController',
            resolve: {
                ownerUid: function () {
                    return $scope.searchResults[index].ownerUid;
                }
            }
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Profile Module*/

    /*View detailed profile*/
    $scope.viewProfile = function (index) {
        $location.path('/profile/' + $scope.searchResults[index].ownerUid);
    };

});