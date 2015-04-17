app.controller("ReviewController", function ($scope, $http, $cookieStore, ownerUid, $modalInstance) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Review Module - create*/

    /*Intial Rating*/
    $scope.rating = 2;

    /*Submit click*/
    $scope.submit = function () {

        /* Validation */
        if ($scope.review == null || $scope.review == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide review";
            return;
        }

        var body = {
            "review": $scope.review,
            "rating": $scope.rating
        };

        $http.post("http://carnet-adib.rhcloud.com/v1/" + $cookieStore.get('uid') + "/review/" + ownerUid + "/add", body)
        .success(function (response) {
            $modalInstance.close();
        })
        .error(function (response) {
            console.log(response);
        });
    };

    /*Cancel click*/
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

});