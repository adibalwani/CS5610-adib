var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope) {
    $scope.change = function () {
        $scope.answer = $scope.number1 + $scope.number2;
    };
});