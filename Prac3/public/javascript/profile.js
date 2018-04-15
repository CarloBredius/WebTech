// JavaScript code for getting the bought history of the logged in user page and showing/hiding the edit profile form
$(document).ready(function () {
    GetHistory();
    $("#profileform").hide();
    document.getElementById("edit").addEventListener("click", function () {
        $("#profileform").show();
    });
});
// function to get the bought history of the logged in user
function GetHistory() {
    $.ajax({
        method: "GET",
        data: { username: getCookie("Username") },
        contentType: "application/json",
        url: "./history",
        success: function (result) {
            str = "<ul>";
            for (var i = 0; i < result.length; i++) {
                str += "<li> " + result[i].productname + "</li>";
            }
            str += "</ul>";
            $("#history").html(str);
        }
    });
}
// get only the value from a cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}