$(function () {
    var mapProp = {
        zoom: 17
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);

    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        new google.maps.Marker({
            position: pos,
            map: map,   
            title: 'Your Location'
        });
        map.setCenter(pos);
    });

});