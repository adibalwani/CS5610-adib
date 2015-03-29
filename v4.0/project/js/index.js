var app = angular.module('CarpoolApp', ['ngRoute', 'ngAutocomplete', 'ui.bootstrap']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
      when('/home', {
          templateUrl: 'partials/home.html',
          controller: 'HomeController'
      }).
      when('/search', {
          templateUrl: 'partials/search.html',
          controller: 'HomeController'
      }).
      when('/access_token', {
          templateUrl: 'partials/home.html',
          controller: 'TokenController'
      }).
      otherwise({
          redirectTo: '/home'
      });
}]);