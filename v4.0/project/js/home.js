app.controller("HomeController", function ($scope, $location, $http, $modal, $cookieStore, $window, toaster) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Download Module*/

    $scope.download = function () {
        $modal.open({
            templateUrl: 'partials/download.html',
            controller: 'DownloadController'
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Scroll Module*/

    $scope.scrollTo = function (id) {
        $('html, body').stop().animate({
            scrollTop: $(id).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    }

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Contact us Module*/

    $scope.sendEmail = function () {

        /* Validate */
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

        if($scope.email == null || $scope.email == "" || !emailFilter.test($scope.email) || $scope.email.match(illegalChars)) {
            $scope.failEmail = "Provide a valid email address";
        } else {
            $scope.failEmail = false;
        }

        if ($scope.message == null || $scope.message == "") {
            $scope.failMessage = "Provide your feedback";
        } else {
            $scope.failMessage = false;
        }

        if ($scope.failMessage || $scope.failEmail) {
            return
        }

        if ($scope.phoneNumber != null || $scope.phoneNumber != "") {
            sendText();
        }

        var body = {
            "client_id": "ext-adib-alwani",
            "client_secret": "2EF3313BABACC399ED2618E437CF2",
            "username": "adib.alwani@hotmail.com",
            "password": "adibalwani",
            "grant_type": "password",
            "scope": "rtr"
        };

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        delete $http.defaults.headers.common.Authorization;

        $http.post("https://api-dev.car.ma:443/security/oauth/token/pw", $.param(body))
        .success(function (response) {
            $http.defaults.headers.post["Content-Type"] = "application/json";
            $http.defaults.headers.common.Authorization = "Bearer " + response.access_token;

            $http.post("https://api-dev.car.ma:443/v1/users/250110403/user-messages",
                {
                    "body": "Message: " + $scope.message + " Email: " + $scope.email + " Phone: " + $scope.phoneNumber,
                    "title": "Message from: " + $scope.name,
                    "messageType": "USER_TEXT"
                })
            .success(function (response) {
                toaster.pop('success', "Thank You for your feedback", "");
            })
        })
        .error(function (response) {
            console.log(response);
        });
    }

    /*Download link*/
    function sendText() {
        var body = {
            "phoneNumber": $scope.phoneNumber,
            "locale": "en_US",
            "clientId": "ext-adib-alwani",
            "country": "USA"
        };

        $http.post("https://api-dev.car.ma:443/v1/users/smsAppDownloadLinks?client_id=ext-adib-alwani", body)
        .success(function (response) {
        })
        .error(function (response) {
            console.log(response);
        });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Trip Module*/

    /*Create New Trip click*/
    $scope.createTrip = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/createTrip.html',
            controller: 'CreateTripController'
        });

        modalInstance.result.then(function () {
            toaster.pop('success', "Trip Successfully Created", "");
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*User Module - login, logout, register*/

    /*Check if already logged in*/
    $scope.access_token = $cookieStore.get('access_token');

    /*View My Profile*/
    $scope.viewMyProfile = function () {
        $location.path('/profile/' + $cookieStore.get('uid'));
    };

    /*Login function*/
    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });

        modalInstance.result.then(function () {
            $scope.access_token = $cookieStore.get('access_token');
        });
    };

    /*Logout function*/
    $scope.logout = function () {
        $cookieStore.remove('access_token');
        $cookieStore.remove('uid');
        $scope.access_token = $cookieStore.get('access_token');
    };

    /*Signup click - Redirect to signup page*/
    $scope.signUp = function () {
        $location.path('/signup');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Search Module*/

    /*Search click - set parameters and redirect*/
    $scope.search = function () {

        /* Form Validation */
        if (!$scope.origin || !$scope.destination || !$scope.date) {
            var error = 'Provide ';
            if (!$scope.origin) {
                error += 'Origin / ';
            }
            if (!$scope.destination) {
                error += 'Destination / ';
            }
            if (!$scope.date) {
                error += 'Date / ';
            }
            error = error.substring(0, error.length - 3);
            toaster.pop('warning', error, "");
            return;
        }

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

});