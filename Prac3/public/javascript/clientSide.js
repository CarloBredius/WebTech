// JavaScript source code on client side
var productAmount = 10;
var ordered = "name";
var filter = "none";

$(document).ready(function () {
    document.getElementById("more").addEventListener("click", function () {
        productAmount += 10;
        GetProducts();
    });
    // TODO: Search bar or filter 
    document.getElementById("filter").addEventListener("change", function (evt) {
        filter = this.value;
        console.log(this.id + ": " +  filter); // TODO: delete before submitting
        GetProducts();
    });
    document.getElementById("order").addEventListener("change", function (evt) {
        ordered = this.value;
        console.log(this.id + ": " + ordered); // TODO: delete before submitting
        GetProducts();
    });
    GetProducts();
});

function GetProducts() {
    $.ajax({
        method: "GET",
        data: { orderby: ordered, amount: productAmount, page: 1 },
        contentType: "application/json",
        url: "./products",
        success: function (result) {
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<article>" +
                    "<h2>" + result[i].name + "</h2>" +
                    "<img src='public/media/" + result[i].image + "' alt='" + result[i].name + "'><br />" +
                    result[i].description + "<br />" +
                    result[i].price + "<br />" +
                    result[i].manufacturer + "<br />" +
                    "<button>buy</button>" +
                    "</article>";
            }
            $("#showproducts").html(str);
        }
    });
}