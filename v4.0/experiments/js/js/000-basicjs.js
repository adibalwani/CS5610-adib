$(function () {
    $("#print").text("I am printed and styled from jQuery");
    $("#print").attr('style', 'color: blue');
});

function hover() {
    $("#hover").text("I am hovered");
}

function unhover() {
    $("#hover").text("Hover me");
}

function msg() {
    alert("Alert!!!!");
}

function square() {
    var number = document.getElementById("number").value;
    var data = "Answer is " + number * number;
    document.getElementById("print").innerHTML = data;
}

function jump(act) {
    if (act == "forward") {
        history.forward();
    } else {
        history.back();
    }
}