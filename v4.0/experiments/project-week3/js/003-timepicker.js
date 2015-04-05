var app = angular.module('MyApp', ['ui.bootstrap']);

app.controller("MyCntl", function ($scope) {
    $scope.getTime = function () {
        console.log($scope.mytime);
    };
});