app.controller("ProfileController", function ($scope, $http, $routeParams, $modal, $location, $cookieStore, $window, toaster) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Scroll Module*/

    $scope.scrollTo = function (id) {
        $('html, body').stop().animate({
            scrollTop: $(id).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    }

    /* Closes the Responsive Menu on Menu Item Click */
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Navigation Module*/

    /*If logged in*/
    $scope.access_token = $cookieStore.get('access_token');
    if ($cookieStore.get('uid') == $routeParams.userId) {
        $scope.myProfile = true;
    }

    /*Signup click - Redirect to signup page*/
    $scope.signUp = function () {
        $location.path('/signup');
    };

    /*Logo Click*/
    $scope.goToHome = function () {
        $location.path('/');
    }

    /*Login click*/
    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });

        modalInstance.result.then(function () {
            $window.location.reload();
        });
    };

    /*My Trips click*/
    $scope.trip = function () {
        $location.path('/trip');
    }

    /*Logout function*/
    $scope.logout = function () {
        $cookieStore.remove('access_token');
        $cookieStore.remove('uid');
        $window.location.reload();
    };

    /*View My Profile*/
    $scope.viewMyProfile = function () {
        $location.path('/profile/' + $cookieStore.get('uid'));
    };

    /*Create New Trip click*/
    $scope.createTrip = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/createTrip.html',
            controller: 'CreateTripController'
        });

        modalInstance.result.then(function () {
            toaster.pop('success', "Trip Successfully Created", "");
            setTimeout(function () {
                $window.location.reload();
            }, 2000);
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Profile Module*/

    //$http.defaults.headers.post["Content-Type"] = "application/json";
    //if ($scope.access_token) {
    //    $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;
    //} else {
    //    delete $http.defaults.headers.common.Authorization;
    //}
    

    $http.get("https://api.car.ma:443/v2/users/" + $routeParams.userId + "?userFields=ALIAS%2CHOME_CITY%2CPHOTO_URL%2CREGISTRATION_TIME&&&client_id=ext-adib-alwani")
    .success(function (response) {
        setProfile(response);
    })
    .error(function (response, status) {
        if (status == 404) {
            $http.get("https://api-dev.car.ma:443/v2/users/" + $routeParams.userId + "?userFields=ALIAS%2CHOME_CITY%2CPHOTO_URL%2CREGISTRATION_TIME&&&client_id=ext-adib-alwani")
            .success(function (response) {
                setProfile(response);
            })
            .error(function (response, status) {
                console.log(response);
            });
        } else {
            console.log(response);
        }
    });

    function setProfile(response) {
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
    };

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
        if (response.trips.length == 0) {
            $http.get("https://api-dev.car.ma:443/v2/users/" + $routeParams.userId + "/trips?client_id=ext-adib-alwani&&tripFields=LOCATION_ADDRESSES%2CDISTANCE%2CSCHEDULE")
            .success(function (res) {
                if (res.trips.length == 0) {
                    $scope.noTrip = true;
                } else {
                    setTrip(res);
                }
            })
            .error(function (res) {
                console.log(res);
            });
        } else {
            setTrip(response);
        }
    })
    .error(function (response) {
        console.log(response);
    });

    function setTrip(response) {
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
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Review Module*/

    /*Get Review*/
    $http.get("http://carnet-adib.rhcloud.com/v1/" + $routeParams.userId + "/review")
    .success(function (response) {

        if (response.error) {
            $scope.noReview = true;
        } else {
            for (var i in response) {
                $scope.review = response[i].review;
                $scope.rating = response[i].rating;

                getReviewer(i);
                getNumberOfFavorite(i);
                getNumberOfReview(i);

                /*Get Reviewer details*/
                function getReviewer(index) {
                    $http.get("https://api-dev.car.ma:443/v2/users/" + response[index].userId + "?userFields=ALIAS%2CHOME_CITY%2CPHOTO_URL%2CREGISTRATION_TIME&&&client_id=ext-adib-alwani")
                    .success(function (res) {
                        response[index].reviewer = res;
                    })
                    .error(function (res) {
                        console.log(res);
                    });
                }

                /*Get # of favorites for this reviewer*/
                function getNumberOfFavorite(index) {
                    $http.get("http://carnet-adib.rhcloud.com/v2/" + response[index].userId + "/favorite")
                    .success(function (res) {
                        if (res.error) {
                            response[index].reviewerNumberOfFavorite = "0";
                        } else {
                            response[index].reviewerNumberOfFavorite = res.length;
                        }
                    })
                    .error(function (res, status) {
                        console.log(res);
                    });
                }

                /*Get # of reviews provided by this reviewer*/
                function getNumberOfReview(index) {
                    $http.get("http://carnet-adib.rhcloud.com/v2/" + response[index].userId + "/review")
                    .success(function (res) {
                        if (res.error) {
                            response[index].reviewerNumberOfReview = "0";
                        } else {
                            response[index].reviewerNumberOfReview = res.length;
                        }
                    })
                    .error(function (res, status) {
                        console.log(res);
                    });
                }

            };
            $scope.reviewResults = response;
        }
    })
    .error(function (response, status) {
        console.log(response);
    });

    $scope.viewProfile = function (index) {
        $location.path('/profile/' + $scope.reviewResults[index].userId);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Favorite Module*/

    /*Get this user's favorite*/
    $http.get("http://carnet-adib.rhcloud.com/v1/" + $routeParams.userId + "/favorite")
    .success(function (response) {
        if (response.error) {
            $scope.noFavorite = true;
        } else {
            for (var i in response) {
                getFavorite(i);
                getNumberOfFavorite(i);
                getNumberOfReview(i);

                /*Get this user's favorite details*/
                function getFavorite(index) {
                    $http.get("https://api-dev.car.ma:443/v2/users/" + response[index].userIdFavorite + "?userFields=ALIAS%2CPHOTO_URL&client_id=ext-adib-alwani")
                    .success(function (res) {
                        response[index].favorite = res;
                    })
                    .error(function (res, status) {
                        if (status == 404) {
                            $http.get("https://api.car.ma:443/v2/users/" + response[index].userIdFavorite + "?userFields=ALIAS%2CPHOTO_URL&client_id=ext-adib-alwani")
                            .success(function (res) {
                                response[index].favorite = res;
                            })
                            .error(function (res, status) {
                                console.log(res);
                            });
                        } else {
                            console.log(res);
                        }
                    });
                }

                /*Get # of favorites for this reviewer*/
                function getNumberOfFavorite(index) {
                    $http.get("http://carnet-adib.rhcloud.com/v2/" + response[index].userIdFavorite + "/favorite")
                    .success(function (res) {
                        if (res.error) {
                            response[index].favoriteNumberOfFavorite = "0";
                        } else {
                            response[index].favoriteNumberOfFavorite = res.length;
                        }
                    })
                    .error(function (res, status) {
                        console.log(res);
                    });
                }

                /*Get # of reviews provided by this reviewer*/
                function getNumberOfReview(index) {
                    $http.get("http://carnet-adib.rhcloud.com/v2/" + response[index].userIdFavorite + "/review")
                    .success(function (res) {
                        if (res.error) {
                            response[index].favoriteNumberOfReview = "0";
                        } else {
                            response[index].favoriteNumberOfReview = res.length;
                        }
                    })
                    .error(function (res, status) {
                        console.log(res);
                    });
                }

            }
            $scope.favoriteResults = response;
        }
    })
    .error(function (response, status) {
        console.log(response);
    });

    /*View Profile*/
    $scope.viewFavoriteProfile = function (index) {
        $location.path('/profile/' + $scope.favoriteResults[index].userIdFavorite);
    }

    /*Get who favors this user*/
    $http.get("http://carnet-adib.rhcloud.com/v2/" + $routeParams.userId + "/favorite")
    .success(function (response) {
        if (response.error) {
            $scope.noFavors = true;
        } else {
            for (var i in response) {
                getFavors(i);
                getNumberOfFavorite(i);
                getNumberOfReview(i);

                /*Get Details of favors*/
                function getFavors(index) {
                    $http.get("https://api-dev.car.ma:443/v2/users/" + response[index].userId + "?userFields=ALIAS%2CPHOTO_URL&client_id=ext-adib-alwani")
                    .success(function (res) {
                        response[index].favorite = res;
                    })
                    .error(function (res, status) {
                        if (status == 404) {
                            $http.get("https://api.car.ma:443/v2/users/" + response[index].userId + "?userFields=ALIAS%2CPHOTO_URL&client_id=ext-adib-alwani")
                            .success(function (res) {
                                response[index].favorite = res;
                            })
                            .error(function (res, status) {
                                console.log(res);
                            });
                        } else {
                            console.log(res);
                        }
                    });
                }

                /*Get # of favorites for this reviewer*/
                function getNumberOfFavorite(index) {
                    $http.get("http://carnet-adib.rhcloud.com/v2/" + response[index].userId + "/favorite")
                    .success(function (res) {
                        if (res.error) {
                            response[index].favoriteNumberOfFavorite = "0";
                        } else {
                            response[index].favoriteNumberOfFavorite = res.length;
                        }
                    })
                    .error(function (res, status) {
                        console.log(res);
                    });
                }

                /*Get # of reviews provided by this reviewer*/
                function getNumberOfReview(index) {
                    $http.get("http://carnet-adib.rhcloud.com/v2/" + response[index].userId + "/review")
                    .success(function (res) {
                        if (res.error) {
                            response[index].favoriteNumberOfReview = "0";
                        } else {
                            response[index].favoriteNumberOfReview = res.length;
                        }
                    })
                    .error(function (res, status) {
                        console.log(res);
                    });
                }
            }
            $scope.favoredResults = response;
        }
    })
    .error(function (response, status) {
        console.log(response);
    })

    /*View Profile*/
    $scope.viewFavoredProfile = function (index) {
        $location.path('/profile/' + $scope.favoredResults[index].userId);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Download Module*/

    $scope.download = function () {
        $modal.open({
            templateUrl: 'partials/download.html',
            controller: 'DownloadController'
        });
    };

});