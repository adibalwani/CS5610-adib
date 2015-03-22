var app = angular.module("MyApp", ["ngRoute"]);

app.controller("NavController", function ($scope, LoginService, $location) {
    $scope.currentUser = null;
    $scope.color = "btn btn-success";

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        var res = LoginService.login(username, password);
        if (res == true) {
            $scope.currentUser = LoginService.getCurrentUser();
            $scope.color = "btn btn-success";
        } else {
            $scope.color = "btn btn-danger";
        }
    }

    $scope.logout = function () {
        $scope.username = null;
        $scope.password = null;
        var res = LoginService.logout();
        $scope.currentUser = null;
        $location.path('partials-001/home.html');
    }
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/home', {
          templateUrl: 'partials-001/home.html'
      }).
        when('/profile', {
            templateUrl: 'partials-001/profile.html'
        }).
        when('/about', {
            templateUrl: 'partials-001/about.html'
        }).

      otherwise({
          redirectTo: 'partials-001/home.html'
      });
}]);

app.factory("LoginService", function () {
    var currentUser = null;

    var users = [
        { username: "adib", password: "adib" },
        { username: "root", password: "root" },
        { username: "admin", password: "admin" }
    ];

    var login = function (username, password) {
        for(var index in users) {
            if(users[index].username == username && users[index].password == password) {
                currentUser = users[index];
                return true;
            }
        }
        return false;
    }

    var getCurrentUser = function () {
        return currentUser;
    }

    var logout = function () {
        currentUser = null;
    }

    return {
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout
    }
});