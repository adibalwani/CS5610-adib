var app = angular.module('CarpoolApp', ['ngAutocomplete', 'ui.bootstrap']);

app.controller("HomeController", function ($scope, $location, $http) {

    /*Miles <-> Meters*/
    function getMiles(i) {
        return i * 0.000621371192;
    }

    function getMeters(i) {
        return i * 1609.344;
    }

    /*Search click*/
    $scope.search = function () {
        new google.maps.Geocoder().geocode({ 'address': $scope.origin }, function (results, status) {
            /*Origin address to LatLon*/
            if (status == google.maps.GeocoderStatus.OK) {
                var origin_latitude = results[0].geometry.location.lat();
                var origin_longitude = results[0].geometry.location.lng();

                new google.maps.Geocoder().geocode({ 'address': $scope.destination }, function (results, status) {
                    /*Destination address to LatLon*/
                    if (status == google.maps.GeocoderStatus.OK) {
                        var dest_latitude = results[0].geometry.location.lat();
                        var dest_longitude = results[0].geometry.location.lng();

                        $http.get("https://api.car.ma:443/v2/trips/search?client_id=ext-adib-alwani&originLon=" + origin_longitude + "&originLat=" + origin_latitude + "&destinationLon=" + dest_longitude + "&destinationLat=" + dest_latitude + "&&&tripType=RIDE_OR_DRIVE&departureTimeStart=" + moment(new Date($scope.date).getTime()).unix() + "&departureTimeEnd=-1&onlineSince=-1&originRadius=10000.0&destinationRadius=10000.0&searchBoxPaddingDistance=10000.0&&adherence=1.0&sortBy=START_TIME_ORIGIN_DISTANCE&pageNum=1&pageSize=20&tripFields=LOCATIONS%2CLOCATION_ADDRESSES%2CDISTANCE%2CSCHEDULE&userFields=FULL_PUBLIC")
                        .success(function (response) {
                            console.log(response);
                        });
                    }
                });
            }
        });
    };

    /*Add URL for login*/
    var index_page = "http://localhost:61854/project/index.html";
    $("#login").attr("href", "https://api-dev.car.ma/security/oauth/authorize?client_id=ext-adib-alwani&response_type=token&redirect_uri=" + index_page);

    /*Hide Login once given access_token*/
    $scope.access_token = $location.url().substr(1).split("&")[0];

    /*Donot display*/
    $scope.signup = false;
    $scope.login = false;

    /*Display signup page*/
    $scope.openSignUp = function () {
        $scope.signup = true;
        $scope.login = false;
    };

    /*Display login page*/
    $scope.openLogin = function () {
        $scope.login = true;
        $scope.signup = false;
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
    }

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
    }
});