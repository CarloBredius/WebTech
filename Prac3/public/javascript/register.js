// JavaScript code for matching password and repassword

function matchPassword() {
    var password = document.getElementsByName("password")[0].value;
    var repassword = document.getElementsByName("repassword")[0].value;
    if (password === repassword) {
        document.getElementById("match").style.color = "green";
    }
    else {
        document.getElementById("match").style.color = "red";
    }
}