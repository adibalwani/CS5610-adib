var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http) {
    
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Register Module*/

    var api_url = "https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false";
    var client_secret = "2EF3313BABACC399ED2618E437CF2";

    /*Signup click*/
    $scope.signUp = function () {
        var sha256 = CryptoJS.algo.SHA256.create();

        var body = {
            "lastName": $scope.lastName,
            "password": $scope.password,
            "email": $scope.email,
            "gender": $scope.gender,
            "firstName": $scope.firstName
        };

        console.log(body);

        sha256.update(api_url);
        sha256.update($scope.email);
        sha256.update(client_secret);

        var hash = sha256.finalize();
        hash = hash.toString(CryptoJS.enc.Hex);

        $http.post("https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false&signature=" + hash, body)
        .success(function (response) {
            console.log(response);
            alert("Registered - A confirmation email is sent to you");
        })
        .error(function (response) {
            console.log(response);
            alert(response.description);
        });

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
});