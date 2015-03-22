$(function () {
    function callback_fn() {
        setTimeout(function () {
            $("#effect").removeAttr("style").hide().fadeIn();
        }, 500);
    };
    
    $("#button").click(function () {
        var effect = $("#type").val();
        var options = {};
        $("#effect").effect(effect, options, 500, callback_fn);
    });
});