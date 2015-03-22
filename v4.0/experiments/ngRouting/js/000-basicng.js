var app = angular.module("MyApp", ["ngRoute"]);

app.controller("NavController", function () {
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/home', {
          templateUrl: 'partials-000/home.html',
      }).
        when('/profile', {
            templateUrl: 'partials-000/profile.html',
        }).
        when('/about', {
            templateUrl: 'partials-000/about.html',
        }).

      otherwise({
          redirectTo: 'partials-000/home.html'
      });
}]);