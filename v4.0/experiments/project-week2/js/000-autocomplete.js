var app = angular.module('MyApp', ['ngAutocomplete']);

app.controller("MyCntl", function ($scope, $http) {

    //$scope.click = function () {

    //    var origin_geocoder = new google.maps.Geocoder();
    //    var dest_geocoder = new google.maps.Geocoder();
    //    var origin = $scope.origin;
    //    var dest = $scope.dest;

    //    origin_geocoder.geocode({ 'address': origin }, function (results, status) {

    //        if (status == google.maps.GeocoderStatus.OK) {
    //            var origin_latitude = results[0].geometry.location.lat();
    //            var origin_longitude = results[0].geometry.location.lng();
    //            dest_geocoder.geocode({ 'address': dest }, function (results, status) {
    //                if (status == google.maps.GeocoderStatus.OK) {
    //                    var dest_latitude = results[0].geometry.location.lat();
    //                    var dest_longitude = results[0].geometry.location.lng();

    //                    //console.log("origin_latitude:" + origin_latitude +
    //                    //    " origin_longitude:" + origin_longitude + " dest_latitude:" + dest_latitude
    //                    //    + " dest_longitude:" + dest_longitude);

    //                    $http.get("https://api.car.ma:443/v2/trips/search?client_id=ext-adib-alwani&originLon=" + origin_longitude + "&originLat=" + origin_latitude + "&destinationLon=" + dest_longitude + "&destinationLat=" + dest_latitude + "&&&tripType=RIDE_OR_DRIVE&departureTimeStart=" + moment(new Date($scope.date).getTime()).unix() + "&departureTimeEnd=-1&onlineSince=-1&originRadius=10000.0&destinationRadius=10000.0&searchBoxPaddingDistance=10000.0&&adherence=1.0&sortBy=START_TIME_ORIGIN_DISTANCE&pageNum=1&pageSize=20&tripFields=LOCATIONS%2CLOCATION_ADDRESSES%2CDISTANCE%2CSCHEDULE&userFields=FULL_PUBLIC")
    //                    .success(function (response) {
    //                        console.log(response);
    //                    });
    //                }
    //            });
    //        }
    //    });

    //};



    $scope.click = function () {

            new google.maps.Geocoder().geocode({ 'address': $scope.origin }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var origin_latitude = results[0].geometry.location.lat();
                    var origin_longitude = results[0].geometry.location.lng();
                    new google.maps.Geocoder().geocode({ 'address': $scope.dest }, function (results, status) {
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

});