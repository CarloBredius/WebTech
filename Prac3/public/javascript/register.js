// JavaScript code for matching password and repassword
// might not be used in the end

$(document).ready(function () {
    document.getElementsByName("repassword")[0].addEventListener("keydown", function () {
        var password = document.getElementsByName("password").value;
        var repassword = document.getElementsByName("repassword").value;
        alert(password);
        console.log(password);
        if (password == repassword) {
            document.getElementById("correct").style = "green";
            alert("test");
        }
    });
});