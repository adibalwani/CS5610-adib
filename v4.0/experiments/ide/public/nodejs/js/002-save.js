﻿var app = angular.module("MyApp", ["ngRoute"]);

app.controller("NavController", function ($scope, LoginService, $location) {
    $scope.currentUser = null;
    $scope.color = "btn btn-success";

    $scope.login = function () {
        LoginService.login($scope.user, callback);
    }

    function callback() {
        $scope.currentUser = LoginService.getCurrentUser();

        if ($scope.currentUser)
            $scope.color = "btn btn-success";
        else
            $scope.color = "btn btn-danger";
    }

    $scope.logout = function () {
        $scope.user.username = null;
        $scope.user.password = null;
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
        when('/profile/:username', {
            templateUrl: 'partials-001/profile.html',
            controller: 'ProfileController'
        }).
        when('/about', {
            templateUrl: 'partials-001/about.html'
        }).
      otherwise({
          redirectTo: 'partials-001/home.html'
      });
}]);

app.factory("LoginService", function ($http) {
    var currentUser = null;

    var login = function (user, callback) {
        $http.post("/001-login", user)
        .success(function (response) {
            currentUser = response;
            callback();
        });
    }

    var logout = function () {
        currentUser = null;
    }

    var updateCurrentUserPhoto = function (photo) {
        currentUser.photo = photo;
    }

    var updateCurrentUser = function (password, email, firstName, lastName) {
        currentUser.password = password;
        currentUser.email = email;
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;

        $http.post("/002-update", currentUser)
        .success(function (response) {
            currentUser = response;
        });
    }

    var getCurrentUser = function () {
        return currentUser;
    }

    return {
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout,
        updateCurrentUser: updateCurrentUser,
        updateCurrentUserPhoto: updateCurrentUserPhoto
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

    if (currentUser.photo == "")
        $scope.loc = "//placehold.it/100";
    else
        $scope.loc = currentUser.photo;
    $scope.match = false;
    $scope.save = false;

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                LoginService.updateCurrentUserPhoto($scope.loc);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

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