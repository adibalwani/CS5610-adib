app.controller("SignUpController", function ($scope, $http, $location, $modal, toaster) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Navigation Module*/

    /*Closes the Responsive Menu on Menu Item Click*/
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    /*Logo Click*/
    $scope.goToHome = function () {
        $location.path('/');
    }

    /*Login click*/
    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });

        modalInstance.result.then(function () {
            $location.path('/');
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Register Module*/

    /*Signup click*/
    $scope.signUp = function () {

        /* Validation */
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

        if ($scope.firstName == null || $scope.firstName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide First Name";
            return;
        } else if ($scope.lastName == null || $scope.lastName == "") {
            $scope.fail = true;
            $scope.failMessage = "Provide Last Name";
            return;
        } else if ($scope.password == "" || $scope.password == null || $scope.password.length < 6) {
            $scope.fail = true;
            $scope.failMessage = "Password must be atleast 6 characters long";
            return;
        } else if ($scope.password != $scope.rePassword) {
            $scope.fail = true;
            $scope.failMessage = "Passwords must match";
            return;
        } else if ($scope.gender == "" || $scope.gender == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid gender";
            return;
        } else if ($scope.country == "" || $scope.country == null) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid country";
            return;
        } else if ($scope.email == null || $scope.email == "" || !emailFilter.test($scope.email) || $scope.email.match(illegalChars)) {
            $scope.fail = true;
            $scope.failMessage = "Provide a valid email address";
            return;
        }

        var sha256 = CryptoJS.algo.SHA256.create();

        var body = {
            "lastName": $scope.lastName,
            "password": $scope.password,
            "email": $scope.email,
            "gender": $scope.gender,
            "firstName": $scope.firstName,
            "country": $scope.country
        };

        sha256.update("https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false");
        sha256.update($scope.email);
        sha256.update("2EF3313BABACC399ED2618E437CF2");

        var hash = sha256.finalize();
        hash = hash.toString(CryptoJS.enc.Hex);

        $http.post("https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false&signature=" + hash, body)
        .success(function (response) {
            toaster.pop('success', "Account Created Successfully", "");
            $location.path('/');
        })
        .error(function (response, status) {
            if (status == 406 && response.errorCode == "email_already_exists") {
                $scope.fail = true;
                $scope.failMessage = response.description;
            } else {
                console.log(response);
            }
        });

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////

});