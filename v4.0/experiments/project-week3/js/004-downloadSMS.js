var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http) {
    
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /*Download click*/
    $scope.signUp = function () {

        var body = {
            "phoneNumber": $scope.phoneNumber,
            "locale": "en_US",
            "clientId": "ext-adib-alwani",
            "country": "USA"
        };

        $http.post("https://api-dev.car.ma:443/v1/users/smsAppDownloadLinks?client_id=ext-adib-alwani", body)
        .success(function (response) {
            console.log(response);
            alert("Sent");
        })
        .error(function (response) {
            console.log(response);
            alert(response.description);
        });

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
});