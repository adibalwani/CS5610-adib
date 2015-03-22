function changeBackground() {
    var image = $('div.active').html();
    image = $(image).attr("src");
    $("body").attr("style", "background-image:url(" + image + ")"); //change background
}