app.controller("ReviewController", function ($scope, $http, $cookieStore, ownerUid, $modalInstance) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Review Module - create*/

    /*Intial Rating*/
    $scope.rating = 2;

    /*Submit click*/
    $scope.submit = function () {

        var body = {
            "review": $scope.review,
            "rating": $scope.rating
        };

        $http.post("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/review/" + ownerUid + "/add", body)
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