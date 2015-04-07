app.controller("HomeController", function ($scope, $location, $http, $modal, $cookieStore, $window) {

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

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Contact us Module*/

    $scope.sendEmail = function () {

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
                    "body": $scope.message + " " + $scope.email + " " + $scope.phone,
                    "title": $scope.name,
                    "messageType": "USER_TEXT"
                })
            .success(function (response) {
                alert("Thank You for your feedback");
            })
        })
        .error(function (response) {
            console.log(response);
        });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Trip Module*/

    /*CreateTrip click*/
    $scope.trip = function () {
        $location.path('/trip');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*User Module - login, logout, register*/

    /*Check if already logged in*/
    $scope.access_token = $cookieStore.get('access_token');

    /*Login function*/
    $scope.login = function () {
        //var modalInstance = $modal.open({
        //    templateUrl: 'partials/login.html',
        //    controller: 'LoginController'
        //});

        //modalInstance.result.then(function () {
        //    $scope.access_token = $cookieStore.get('access_token');
        //});

        /*Temporary Login Bypass*/
        var body = {
            "client_id": "ext-adib-alwani",
            "client_secret": "2EF3313BABACC399ED2618E437CF2",
            "username": "alwani.a@husky.neu.edu",
            "password": "#Gdmo0577",
            "grant_type": "password",
            "scope": "rtr"
        };
        
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        delete $http.defaults.headers.common.Authorization;

        $http.post("https://api-dev.car.ma:443/security/oauth/token/pw", $.param(body))
        .success(function (response) {
            $cookieStore.put('access_token', response.access_token);
            $cookieStore.put('uid', response.uid);
            $scope.access_token = $cookieStore.get('access_token');
        })
        .error(function (response) {
            console.log(response);
        });
        /*Temporary Login Bypass*/
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