app.controller("TokenController", function ($scope, $location) {
    console.log($location.url());
    //$rootScope.access_token = $location.url().substr(14).split("&")[0];
    $location.path('partials/home.html');
});