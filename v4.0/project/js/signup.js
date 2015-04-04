app.controller("SignUpController", function ($scope, $http, $location, $rootScope) {

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
            var index_page = "http://localhost:61854/project/index.html#/access_token/";
            $location.path("https://api-dev.car.ma/security/oauth/authorize?client_id=ext-adib-alwani&response_type=token&redirect_uri=" + index_page);
        })
        .error(function (response) {
            console.log(response);
            alert(response.description);
        });

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////

});