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
        $location.path('partials-003/home.html');
    }
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/home', {
          templateUrl: 'partials-003/home.html'
      }).
        when('/profile/:username', {
            templateUrl: 'partials-003/profile.html',
            controller: 'ProfileController'
        }).
        when('/about', {
            templateUrl: 'partials-003/about.html'
        }).
      otherwise({
          redirectTo: 'partials-003/home.html'
      });
}]);

app.factory("LoginService", function () {
    var currentUser = null;

    var users = [
        { username: "adib", password: "adib", email: "alwani.a@husky.neu.edu", firstName: "Adib", lastName: "Alwani" },
        { username: "root", password: "root", email: "root@husky.neu.edu", firstName: "Root", lastName: "Admin" },
        { username: "admin", password: "admin", email: "admin@husky.neu.edu", firstName: "Admin", lastName: "Root" }
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

    var updateCurrentUser = function (password, email, firstName, lastName) {
        currentUser.password = password;
        currentUser.email = email;
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
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
        logout: logout,
        updateCurrentUser: updateCurrentUser
    }
});

app.controller("ProfileController", function ($scope, LoginService, $routeParams) {
    var username = $routeParams.username;
    $scope.username = username;
    var currentUser = LoginService.getCurrentUser();

    $scope.firstname_edit = currentUser.firstName;
    $scope.lastname_edit = currentUser.lastName;
    $scope.email_edit = currentUser.email;
    $scope.password_edit = currentUser.password;
    $scope.repassword_edit = currentUser.password;

    $scope.match = false;
    $scope.save = false;

    $scope.saveChanges = function () {
        var password = $scope.password_edit;
        var repassword = $scope.repassword_edit;
        var email = $scope.email_edit;
        var firstName = $scope.firstname_edit;
        var lastName = $scope.lastname_edit;

        if (password != repassword) {
            $scope.match = true;
            $scope.save = false;
        } else {
            $scope.match = false;
            $scope.save = true;
            LoginService.updateCurrentUser(password, email, firstName, lastName);
        }
    }
});