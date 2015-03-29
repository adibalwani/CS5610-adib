var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http, $location) {

    $scope.access_token = $location.url().substr(14).split("&")[0];

    $scope.send = function () {

        $http.defaults.headers.common.Authorization = "Bearer " + $scope.access_token;

        $http.post("https://api-dev.car.ma:443/v1/users/250110403/user-messages",
            {
                "body": $scope.body,
                "title": $scope.title,
                "messageType": "USER_TEXT"
            })
        .success(function (response) {
            alert("Sent");
        })
    };
});