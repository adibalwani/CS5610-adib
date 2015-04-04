app.controller("TokenController", function ($rootScope, $location) {

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*Token Fetch Module*/

    /* Fetch Access Token and redirect to Home Page */
    if ($location.url().length > 14) {
        $rootScope.access_token = $location.url().substr(14).split("&")[0];
    }
    $location.path('/');

    /////////////////////////////////////////////////////////////////////////////////////////////////
});