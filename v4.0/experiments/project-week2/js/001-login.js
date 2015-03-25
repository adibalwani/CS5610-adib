var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http, $location) {

    $scope.access_token = $location.url().substr(1).split("&")[0];

});