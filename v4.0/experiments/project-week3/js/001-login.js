var app = angular.module("MyApp", []);

app.controller("Controller", function ($scope, $http) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Login Module*/

    /*Login click*/
    $scope.login = function () {

        var body = {
            "client_id": "ext-adib-alwani",
            "client_secret": "2EF3313BABACC399ED2618E437CF2",
            "username": $scope.email,
            "password": $scope.password,
            "grant_type": "password",
            "scope": "rtr"
        };

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $http.post("https://api-dev.car.ma:443/security/oauth/token/pw", $.param(body))
        .success(function (response) {
            alert("Logged in: Access_Token " + response.access_token);
        })
        .error(function (response) {
            alert("Error: Check console");
            console.log(response);
        });
    };

});