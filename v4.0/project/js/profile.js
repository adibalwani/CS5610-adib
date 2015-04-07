app.controller("ProfileController", function ($scope, $http, $routeParams, $modal, $location) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Profile Module*/

    $http.get("https://api.car.ma:443/v2/users/" + $routeParams.userId + "?userFields=ALIAS%2CHOME_CITY%2CPHOTO_URL%2CREGISTRATION_TIME&&&client_id=ext-adib-alwani")
    .success(function (response) {
        //console.log(response);
        $scope.photoUrl = response.photoUrl;
        $scope.alias = response.alias;
        $scope.firstName = response.firstName;
        $scope.homeCity = response.homeCity.name;
        $scope.country = response.homeCity.country.name;

        /*Epoch to Weeks before today*/
        var registrationDate = new Date(response.registrationTime);
        var today = new Date();
        var timeDiff = Math.abs(today.getTime() - registrationDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        diffDays = Math.floor(diffDays / 7);    //weeks
        $scope.registrationTime = diffDays;

    })
    .error(function (response, status) {
        if (status == 404) {
            $http.get("https://api-dev.car.ma:443/v2/users/" + $routeParams.userId + "?userFields=ALIAS%2CHOME_CITY%2CPHOTO_URL%2CREGISTRATION_TIME&&&client_id=ext-adib-alwani")
            .success(function (response) {
                //console.log(response);
                $scope.photoUrl = response.photoUrl;
                $scope.alias = response.alias;
                $scope.firstName = response.firstName;
                if (response.homeCity) {
                    $scope.homeCity = response.homeCity.name;
                    $scope.country = response.homeCity.country.name;
                }
                
                /*Epoch to Weeks before today*/
                var registrationDate = new Date(response.registrationTime);
                var today = new Date();
                var timeDiff = Math.abs(today.getTime() - registrationDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                diffDays = Math.floor(diffDays / 7);    //weeks
                $scope.registrationTime = diffDays;

            })
            .error(function (response, status) {
                console.log(response);
            });
        } else {
            console.log(response);
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Trip Module*/

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

    $http.get("https://api.car.ma:443/v2/users/" + $routeParams.userId + "/trips?client_id=ext-adib-alwani&&tripFields=LOCATION_ADDRESSES%2CDISTANCE%2CSCHEDULE")
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

                /*Convert metres to miles*/
                response.trips[i].distance = Math.round(getMiles(response.trips[i].distance) * 10) / 10;
            }
            $scope.tripResults = response.trips;

        })
        .error(function (response) {
            console.log(response);
        });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Review Module*/

    /*Get Review*/
    $http.get("http://localhost:3000/v1/" + $routeParams.userId + "/review")
    .success(function (response) {
        for (var i in response) {
            $scope.review = response[i].review;
            $scope.rating = response[i].rating;

            /*Get Reviewer details*/
            $http.get("https://api-dev.car.ma:443/v2/users/" + response[i].userId + "?userFields=ALIAS%2CHOME_CITY%2CPHOTO_URL%2CREGISTRATION_TIME&&&client_id=ext-adib-alwani")
            .success(function (res) {
                response[i].reviewer = res;
            })
            .error(function (res) {
                console.log(res);
            });

            /*Get # of favorites for this reviewer*/
            $http.get("http://localhost:3000/v2/" + response[i].userId + "/favorite")
            .success(function (res) {
                response[i].reviewerNumberOfFavorite = res.length;
            })
            .error(function (res, status) {
                if (status == 404) {
                    response[i].reviewerNumberOfFavorite = "0";
                } else {
                    console.log(res);
                }
                
            });

            /*Get # of reviews provided by this reviewer*/
            $http.get("http://localhost:3000/v2/" + response[i].userId + "/review")
            .success(function (res) {
                response[i].reviewerNumberOfReview = res.length;
            })
            .error(function (res, status) {
                if (status == 404) {
                    response[i].reviewerNumberOfReview = "0";
                } else {
                    console.log(res);
                }
                
            });

        };
        $scope.reviewResults = response;
    })
    .error(function (response, status) {
        if (status == 404) {
            $scope.noReview = true;
        } else {
            console.log(response);
        }
    });

    $scope.viewProfile = function (index) {
        $location.path('/profile/' + $scope.reviewResults[index].userId);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Favorite Module*/

    /*Get this user's favorite*/
    $http.get("http://localhost:3000/v1/" + $routeParams.userId + "/favorite")
    .success(function (response) {
        console.log(response);
        $scope.favoriteResults = response;
    })
    .error(function (response, status) {
        if (status == 404) {
            $scope.noFavorite = true;
        } else {
            console.log(response);
        }
    });

    /*Get who favors this user*/
    $http.get("http://localhost:3000/v2/" + $routeParams.userId + "/favorite")
    .success(function (response) {
        console.log(response);
        for (var i in response) {
            /*Get who favors this user details*/
            $http.get("https://api-dev.car.ma:443/v2/users/" + response[i].userId + "?userFields=PHOTO_URL&client_id=ext-adib-alwani")
            .success(function (res) {
                response[i].favorite = res;
                console.log(response[i], "mine");
            })
            .error(function (res) {
                console.log(res);
            });
        }
        $scope.favoredResults = response;
    })
    .error(function (response, status) {
        if (status == 404) {

        } else {
            console.log(response);
        }
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Download Module*/

    $scope.download = function () {
        $modal.open({
            templateUrl: 'partials/download.html',
            controller: 'DownloadController'
        });
    };

});