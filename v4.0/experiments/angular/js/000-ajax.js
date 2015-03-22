$(function () {
    $("#getMovie").click(function () {
        $.ajax({
            url: "http://www.myapifilms.com/imdb?title=" + $("#movie").val() +
                "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=10&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N",
            dataType: "jsonp",
            success: renderMovies
        });
    });
})

function renderMovies(movies) {
    var ul = $("#movie_list");
    for (var i in movies) {
        var movie = movies[i];
        var title = movie.title;
        var plot = movie.plot;
        var p = $("<p>").append(plot);
        var poster = $("<img>").attr("src", movie.urlPoster);
        var li = $("<li>")
            .append(title)
            .append(p);
        ul.append(li);
        ul.append(poster);
    }
}