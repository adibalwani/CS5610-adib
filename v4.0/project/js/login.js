app.controller("LoginController", function ($scope, $modalInstance, $http, $rootScope) {

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
            "scope" : "rtr"
        };

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $http.post("https://api-dev.car.ma:443/security/oauth/token/pw", $.param(body))
        .success(function (response) {
            $rootScope.access_token = response.access_token;
            $modalInstance.dismiss('cancel');
        })
        .error(function (response) {
            alert(response);
        });
    };

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

});