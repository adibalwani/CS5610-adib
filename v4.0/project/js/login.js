app.controller("LoginController", function ($scope, $modalInstance, $http, $cookieStore) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Login Module*/

    /*Temporary login bypass*/
    //$scope.email = "adib.alwani@hotmail.com";
    //$scope.password = "adibalwani";
    /*Temporary login bypass*/

    /*Login click*/
    $scope.login = function () {
        
        /* Validation */
        if ($scope.email == "" || $scope.email == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid email address";
            return;
        } else if ($scope.password == "" || $scope.password == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid password";
            return;
        }

        $scope.fail = false;

        var body = {
            "client_id": "ext-adib-alwani",
            "client_secret": "2EF3313BABACC399ED2618E437CF2",
            "username": $scope.email,
            "password": $scope.password,
            "grant_type": "password",
            "scope" : "rtr"
        };

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        delete $http.defaults.headers.common.Authorization;

        $http.post("https://api-dev.car.ma:443/security/oauth/token/pw", $.param(body))
        .success(function (response) {
            $cookieStore.put('access_token', response.access_token);
            $cookieStore.put('uid', response.uid);
            $modalInstance.close();
        })
        .error(function (response, status) {
            if (status == 400 && response.error == "invalid_grant") {
                $scope.fail = true;
                $scope.failMessage = "Provide valid credentials";
            } else {
                console.log(response);
            }
        });
    };

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

});