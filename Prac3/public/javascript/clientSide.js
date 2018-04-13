// JavaScript source code on client side
var productAmount = 10;
var ordered = "name";
var searchProduct = "";
var filter = "none";

// load products and eventlisteners when the document is ready
$(document).ready(function () {
    // Fill screen with 10 products initially
    GetProducts();

    //$("#loggedInText").hide();
    // check session
    // https://stackoverflow.com/questions/5968196/check-cookie-if-cookie-exists
    var loggedIn = false; //document.cookie.indexOf('userSession');
    alert(console.log(document.cookie));

    if (loggedIn) {
        $("#loggedInText").show();
        $("#loginform").hide();
        $("#registerText").hide();
    }
    else
    {
        $("#loggedInText").hide();

        $("#loginform").show();
        $("#registerText").show();
    }

    document.getElementById("search").addEventListener("click", function (evt) {
        searchProduct = document.getElementById("lookup").value;
        console.log(this.id + ": " + searchProduct);
        GetProducts();
    });

    // Give buttons functionality
    $("#showproducts").on("click", "button", function () {
        var productId = $(this).parent().attr('data-productId');
        var productPrice = $(this).parent().attr('data-productPrice');
        //var productPrice = $(this).parent().children("#price");
        var txt;
        var buy = confirm("Are you sure you want to buy " + productId + " for $" + productPrice + ",- ?");
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

// function to get products from the database using an ajax call fetching in json
// which products are fetched depend on the paramters filled in in the search options
// these products are then showed on the page using generated html code
function GetProducts() {
    $.ajax({
        method: "GET",
        data: { orderby: ordered, lookup: searchProduct, amount: productAmount, page: 1 },
        contentType: "application/json",
        url: "./products",
        success: function (result) {
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<article data-productId='" + result[i].name + "' data-productPrice='" + result[i].price +"'>" +
                    "<h2>" + result[i].name + "</h2>" +
                    "<img src='public/media/" + result[i].image + "' alt='" + result[i].name + "'><br />" +
                    "Category: " + result[i].category + "<br />" +
                    "Description: " + result[i].description + "<br />" +
                    "Price: $" + result[i].price + ",-</div><br />" +
                    "Manufacturer: " + result[i].manufacturer + "<br />" +
                    "<button>Buy</button>" +
                    "</article> \n";
            }
            $("#showproducts").html(str);
        }
    });
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 