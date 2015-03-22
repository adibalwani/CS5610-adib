$(function () {
    var xmlhttp = new XMLHttpRequest();
    var url = "000-jsonbasics.txt";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var arr = JSON.parse(xmlhttp.responseText);
            display(arr);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
})

function display(arr) {
    var out = "<tbody>";
    for (var i = 0; i < arr.length; i++) {
        out += "<tr><td>" + (i + 1) + "</td><td><a href='" + arr[i].url + "' target='_blank'>" +
            arr[i].print + "</a></td></tr>";
    }
    out += "</tbody>";
    $("#link").append(out);
}