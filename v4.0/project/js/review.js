app.controller("ReviewController", function ($scope, $http, $cookieStore, ownerUid, $modalInstance, $modal) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Review Module - create*/

    /*Step-1 Check Login*/
    if ($cookieStore.get('access_token')) {
        /*Step-2 Check if review exists*/
        $http.get("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/review")
        .success(function (response) {
            /*Step-3 Provide message if review already exist*/
            
        })
        .error(function (response, status) {
            if (status == 404) {
                /*Step-3 Create new review if one already doesn't exist*/
            } else {
                console.log(response);
            }
        });
    } else {
        /*Not logged in*/
        $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });
    }

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
            console.log(response);
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
    /*Review Module - remove*/

    /*Remove review click*/
    $scope.removeReview = function (index) {
        $http.post("http://localhost:3000/v1/" + $cookieStore.get('uid') + "/review/" + ownerUid + "/remove")
        .success(function (response) {
            console.log(response);
        })
        .error(function (response) {
            console.log(response);
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

});