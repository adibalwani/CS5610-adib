var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $location) {

    $scope.access_token = $location.url().substr(1).split("&")[0];

});