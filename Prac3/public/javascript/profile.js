// JavaScript code for profile page
$(document).ready(function () {
    GetHistory();
    $("#profileform").hide();
    document.getElementById("edit").addEventListener("click", function () {
        $("#profileform").show();
    });
});

function GetHistory() {
    $.ajax({
        method: "GET",
        data: { username: "Chantal" }, // TODO: Get cookie name
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