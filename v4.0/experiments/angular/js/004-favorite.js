var app = angular.module("myapp", []);

app.controller("cntl", function ($scope, $http) {

    $scope.movies = [];
    $scope.favoriteMovies = [];
    $scope.visible_favorite = false;
    $scope.visible_details = false;

    $scope.detailsMovie = function (movie) {
        $http.jsonp("http://www.myapifilms.com/imdb?format=JSONP&idIMDB=" + movie.idIMDB + "&callback=JSON_CALLBACK")
        .success(function (movie) {
            $scope.visible_details = true;
            $scope.details = movie;
        });
    }
    
    $scope.addToFavorites = function (movie) {
        $scope.visible_favorite = true;
        $scope.favoriteMovies.push(movie);
    }

    $scope.removeFavoriteMovie = function (movie) {
        var index = $scope.favoriteMovies.indexOf(movie);
        $scope.favoriteMovies.splice(index, 1);
        var len = $scope.favoriteMovies.length;
        if (len == 0) {
            $scope.visible_favorite = false;
        }
    }

    $scope.searchMovies = function () {
        var title = $scope.searchByTitle;
        $http.jsonp("http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=10&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.movies = response;
        });   
    }

    $scope.removeMovies = function (movie) {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }

    $scope.addMovie = function () {
        var newMovie = {
            title: $scope.movie.title,
            year: $scope.movie.year,
            rating: $scope.movie.rating,
            plot: $scope.movie.plot
        };
        $scope.movies.push(newMovie);
    }

    $scope.selectMovie = function (m) {
        $scope.movie = m;
    }
});