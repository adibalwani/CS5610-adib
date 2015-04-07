var app = angular.module('CarpoolApp', ['ngRoute', 'ngAutocomplete', 'ui.bootstrap', 'ngCookies']);

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
            controller: 'SearchController'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignUpController'
        }).
        when('/trip', {
            templateUrl: 'partials/trip.html',
            controller: 'TripController'
        }).
        when('/review', {
            templateUrl: 'partials/review.html',
            controller: 'ReviewController'
        }).
        when('/profile/:userId', {
            templateUrl: 'partials/profile.html',
            controller: 'ProfileController'
        }).
        otherwise({
            redirectTo: '/'
       })
}]);