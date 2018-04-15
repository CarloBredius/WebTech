// JavaScript code for matching password and repassword

// When the password and repassword match, show that to the user by turning 'match?' green, otherwise red
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