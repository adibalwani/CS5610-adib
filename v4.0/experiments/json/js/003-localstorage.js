function save() {
    var val = $("#input").val();
    localStorage.setItem("data", val);
}

function load() {
    $("#existing").text(localStorage.getItem("data"));
}