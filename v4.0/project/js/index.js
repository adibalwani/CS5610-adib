var app = angular.module('CarpoolApp', ['ngRoute', 'ngAutocomplete', 'ui.bootstrap']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        }).
        when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        }).
        when('/search', {
            templateUrl: 'partials/search.html',
            controller: 'HomeController'
        }).
        when('/signup', {
            templateUrl: 'partials/home.html',
            controller: 'TokenController'
        }).
        otherwise({
           templateUrl: 'partials/home.html',
           controller: 'TokenController'
       })
}]);