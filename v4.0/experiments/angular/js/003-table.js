var app = angular.module("myapp", []);

app.controller("cntl", function ($scope, $http) {

    $scope.movies = [];

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