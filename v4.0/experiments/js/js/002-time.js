$(function () {
    addOption("#hour", 24);
    addOption("#minute", 60);
    addOption("#second", 60);
    getTime();
});

function addOption(unit, max) {
    for (i = 0; i <= max; i++) {
        $(unit).append("<option value=" + i + ">" + i + "</ option>");
    }
}

var timeout;

function getTime() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    month = appendZero(month + 1);
    day = appendZero(day);
    h = appendZero(h);
    m = appendZero(m);
    s = appendZero(s);

    $("#time").text(month + "/" + day + "/" + year + " " + h + ":" + m + ":" + s);
    clearTimeout(timeout);
    timeout = setTimeout("getTime()", time);
}

function appendZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var timer_id;

function setAlarm() {
    var hour = $("#hour").val();
    var minute = $("#minute").val();
    var second = $("#second").val();
    var time = (hour * 3600) + (minute * 60) + second; //second
    time = time * 1000; //millisecond
    
    $(".alarm").trigger('load');
    clearTimeout(timer_id);
    timer_id = setTimeout("soundAlarm()", time);
}

function soundAlarm() {
    $(".alarm").trigger('play');
}

function stopAlarm() {
    $(".alarm").trigger('pause');
    clearTimeout(timer_id);
}