// JavaScript source code on client side
var productAmount = 10;
var ordered = "name";
var searchProduct = "";
var filter = "none";

$(document).ready(function () {
    // Fill screen with 10 products initially
    GetProducts();

    document.getElementById("search").addEventListener("click", function (evt) {
        searchProduct = document.getElementById("lookup").value;
        console.log(this.id + ": " + searchProduct);
        GetProducts();
    });

    // Give buttons functionality
    $("#showproducts").on("click", "button", function () {
        var productId = $(this).parent().attr('data-productId');
        //var productPrice = $(this).parent().children("#price");
        var txt;
        var buy = confirm("Are you sure you want to buy " + productId + "?");
        if (buy == true) {
            //TODO: get user from session
            txt = productId + " is added to " + "logged-in user" + " history.";
            // Store product in bought history
        }
        else {
            txt = "Declined"
        }
        alert(txt);
    });

    document.getElementById("order").addEventListener("change", function (evt) {
        ordered = this.value;
        console.log(this.id + ": " + ordered); // TODO: delete before submitting
        GetProducts();
    });

    document.getElementById("more").addEventListener("click", function () {
        // change if database size changes, (Could Do: get dbsize instead of hardcode with get)
        if (productAmount <= 20) {
            productAmount += 10;
        }
        GetProducts();
    });
    document.getElementById("less").addEventListener("click", function () {
        if (productAmount >= 10) {
            productAmount -= 10;
        }
        GetProducts();
    });
});

function GetProducts() {
    $.ajax({
        method: "GET",
        data: { orderby: ordered, lookup: searchProduct, amount: productAmount, page: 1 },
        contentType: "application/json",
        url: "./products",
        success: function (result) {
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<article data-productId='" + result[i].name + "'>" +
                    "<h2>" + result[i].name + "</h2>" +
                    "<img src='public/media/" + result[i].image + "' alt='" + result[i].name + "'><br />" +
                    "Category: " + result[i].category + "<br />" +
                    "Description: " + result[i].description + "<br />" +
                    "<div id='price'> Price: $" + result[i].price + ",-</div><br />" +
                    "Manufacturer: " + result[i].manufacturer + "<br />" +
                    "<button>Buy</button>" +
                    "</article>";
            }
            $("#showproducts").html(str);
        }
    });
}