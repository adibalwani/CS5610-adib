$(function () {
    $('#username').keyup(function () {
        validateUsername();
    })

    $('#password').keyup(function () {
        validatePassword();
    })

    $('#dob').keyup(function () {
        validateDOB();
    })

    $('#dob').mousedown(function () {
        validateDOB();
    })
});

function validateUsername() {
    var username = $("#username").val();

    if (username == null || username == "" || username.length < 6) {
        $("#username_msg").html("<img src='incorrect.png' width='20' height='20'/>" +
          " Username must be at least 6 char long");
        return false;
    } else {
        $("#username_msg").html("<img src='correct.png' width='20' height='20'/>");
        return true;
    }
}

function validatePassword() {
    var password = $("#password").val();

    if (password == null || password == "" || password.length < 6 ||
        !password.match(/[a-zA-Z]/) || !password.match(/[0-9]/)) {
        $("#password_msg").html("<img src='incorrect.png' width='20' height='20'/>" +
            " Password must be atleast 6 char long with atleast one digit and alphabet");
    } else {
        $("#password_msg").html("<img src='correct.png' width='20' height='20'/>");
    }
}

function validateDOB() {
    var dob = $("#dob").val();
    
    var date = dob.substring(8, 11);
    date = parseInt(date);
    var month = dob.substring(5, 7);
    month = parseInt(month);
    var year = dob.substring(0, 4);
    year = parseInt(year);
    
    var given_date = new Date(year, month - 1, date, 0, 0, 0, 0);
    
    if (given_date > new Date() || dob == null || dob == "") {
        $("#dob_msg").html("<img src='incorrect.png' width='20' height='20'/>" +
        " Enter a date before today");
    } else {
        $("#dob_msg").html("<img src='correct.png' width='20' height='20'/>");
    }
}