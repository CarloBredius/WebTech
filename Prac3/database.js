
$(document).ready(function () {
    document.getElementById("submit").addEventListener("click", function () {
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        var repassword = document.getElementById("repassword");
        var name = document.getElementById("name");
        var zipcode = document.getElementById("zipcode");
        var email = document.getElementById("email");
        if (password == repassword) {
            // add to database
            alert("Want to add " + username + "to the database.");
        }
        else {
            alert("Password does not match re-entered password.")
        }
    });
});


