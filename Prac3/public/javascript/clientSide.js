// JavaScript source code on client side

//set some global variables to be used in multiple methods
var productAmount = 10;
var ordered = "name";
var searchProduct = "";
var loggedIn = false;
var cookie;

// load products and eventlisteners when the document is ready
$(document).ready(function () {
    // Fill screen with 10 products initially
    //check which user is logged in if any
    CheckUser();
    GetProducts();

    // check session
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
        if (loggedIn) {
            var buy = confirm("Are you sure you want to buy " + productId + " for $" + productPrice + ",- ?");
            if (buy == true) {
                txt = productId + " is added to the history of " + cookie + ".";
                // Store product in bought history
                post('/transaction', { username: cookie, productname: productId });
            }
            else {
                txt = "Declined"
            }
            alert(txt);
        }
        else {
            alert("Log in to buy products");
        }
    });

    document.getElementById("order").addEventListener("change", function (evt) {
        ordered = this.value;
        GetProducts();
    });

    document.getElementById("more").addEventListener("click", function () {
        if (productAmount <= 30) {
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
// post from client side js 
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    // create form to make post request
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

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
// Change what is shown to an Anonymous User (AU) and a Registered Buyer (RB)
function LoginVisibility() {
    if (loggedIn) {
        $("#user").html(cookie);
        $("#loggedInText").show();
        $("#loginform").hide();
        $("#registerText").hide();
        $("#profilePage").show();
    }
    else {
        $("#loggedInText").hide();
        $("#loginform").show();
        $("#registerText").show();
        $("#profilePage").hide();
    }
}
// get only the value from a cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
// check if a user is logged in
function CheckUser() {
    cookie = getCookie("Username");
    if (cookie) {
        loggedIn = true;
    }
    else {
        loggedIn = false;
    }
    LoginVisibility();
}