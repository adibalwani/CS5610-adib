app.controller("DownloadController", function ($scope, $http, $modalInstance, toaster) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Download Module*/

    /*Download click*/
    $scope.sendText = function () {

        /*Validation*/
        if ($scope.phoneNumber == "" || $scope.phoneNumber == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid phone number";
            return;
        }

        $scope.fail = false;

        var body = {
            "phoneNumber": $scope.phoneNumber,
            "locale": "en_US",
            "clientId": "ext-adib-alwani",
            "country": "USA"
        };

        $http.post("https://api-dev.car.ma:443/v1/users/smsAppDownloadLinks?client_id=ext-adib-alwani", body)
        .success(function (response) {
            toaster.pop('success', "Text Sent Successfully", "");
            $modalInstance.close();
        })
        .error(function (response, status) {
            if (status == 400 && response.errorCode == "invalid_phone_number") {
                $scope.fail = true;
                $scope.failMessage = "Invalid phone number";
            } else {
                console.log(response);
            }
        });

    }

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
});