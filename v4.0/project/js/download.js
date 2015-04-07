app.controller("DownloadController", function ($scope, $http, $modalInstance) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Download Module*/

    /*Download click*/
    $scope.sendText = function () {

        var body = {
            "phoneNumber": $scope.phoneNumber,
            "locale": "en_US",
            "clientId": "ext-adib-alwani",
            "country": "USA"
        };

        $http.post("https://api-dev.car.ma:443/v1/users/smsAppDownloadLinks?client_id=ext-adib-alwani", body)
        .success(function (response) {
            $modalInstance.close();
        })
        .error(function (response) {
            console.log(response);
        });

    }

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
});