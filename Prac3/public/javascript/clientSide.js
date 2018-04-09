// JavaScript source code on client side
var productAmount = 10;
var ordered = "name";
var searchProduct = "";
var filter = "none";

$(document).ready(function () {
    // Fill screen with 10 products initially
    GetProducts();

    // TODO: Search bar or filter 
    document.getElementById("search").addEventListener("click", function (evt) {
        searchProduct = document.getElementById("lookup").value;
        console.log(this.id + ": " + searchProduct);
        GetProducts();
    });
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

// Can't change labels to something other than OK and cancel
// Source: https://stackoverflow.com/questions/22885897/javascript-rename-confirm-buttons
function buyProduct() {
    var r = confirm("Are you sure you want to buy " /*+ productName*/ + "?");
    if (r) {
        // put product in bought history
        alert("Product added to bought history");
    } else {
        // do nothing when canceled (delete else)
        alert("You pressed cancel");
    }
}

function GetProducts() {
    $.ajax({
        method: "GET",
        data: { orderby: ordered, lookup: searchProduct, amount: productAmount, page: 1 },
        contentType: "application/json",
        url: "./products",
        success: function (result) {
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<article>" +
                    "<h2>" + result[i].name + "</h2>" +
                    "<img src='public/media/" + result[i].image + "' alt='" + result[i].name + "'><br />" +
                    "Category: " + result[i].category + "<br />" +
                    "Description: " + result[i].description + "<br />" +
                    "Price: $" + result[i].price + ",-<br />" +
                    "Manufacturer: " + result[i].manufacturer + "<br />" +
                    "<button onclick='buyProduct("/* + result[i].name*/ + ")'>Buy</button>" +
                    "</article>";
            }
            $("#showproducts").html(str);
        }
    });
}